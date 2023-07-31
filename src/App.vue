<template>
  <div>
      <form @submit.prevent="add">
          <input type="hidden" v-model="form.id">
          <input type="text" v-model="form.name" placeholder="Nama">
          <input type="text" v-model="form.phone" placeholder="No.Telp">
          <input type="text" v-model="form.address" placeholder="Alamat">
          <button type="submit" v-show="!updateSubmit">Add</button>
          <!-- jika tidak update maka tombol update tidak muncul -->
          <button @click="update(form)" type="button" v-show="updateSubmit">Update</button>
          <!-- jika tombol edit di klik maka tombol add akan berubah menjadi update -->
      </form>
      <ul :key="user.id" v-for="user in users">
          <li>
           <div >
              <span class="user-info">{{ user.name }}</span>   
              <span class="user-info">{{ user.phone }}</span>
              <span class="user-info">{{ user.address }}</span>
           </div>
              <div>
              <button @click="edit(user)">Edit</button>
              <button @click="del(user)">Delete</button>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'

  export default {
      data() {
          return {
              form: {
                 id: '',
                  name: '',
                  phone: '',
                  address: ''
              },
              users: '',
              updateSubmit: false
          }
      },
      methods: {
          load() {
              axios.get('http://localhost:8080/users').then(res => {
                  this.users = res.data //respons dari rest api dimasukan ke users
              }).catch((err) => {
                  console.log(err);
              })
           },
          add() {
              axios.post('http://localhost:8080/users', this.form).then(res => {
                  this.load()
                  this.form.name = ''
                  this.form.phone = ''
                  this.form.address = ''
              })
          },
          edit(user) {
              this.updateSubmit = true
              this.form.id = user.id
              this.form.name = user.name
              this.form.phone = user.phone
              this.form.address = user.address
          },
          update(form) {
              return axios.put('http://localhost:8080/users/update/' + form.id, {
                name: this.form.name,
                phone: this.form.phone,
                address: this.form.address
              }).then(res => {
                  this.load()
                  this.form.id = ''
                  this.form.name = ''
                  this.form.phone = ''
                  this.form.address = ''
                  this.updateSubmit = false
              }).catch((err) => {
                  console.log(err);
                
              })
          },
          del(user) {
              axios.delete('http://localhost:8080/users/delete/' + user.id).then((res) => {
                  this.load();
                  let index = this.users.indexOf(user.id);
                  this.users.splice(index, 1);
              });
          }
        },
        mounted() {
          this.load()
      },
      } 
  
</script>

<style scoped>

form {
  margin-bottom: 20px;
}
input[type="text"] {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
input[type="text"]:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
}
button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  color-interpolation-filters: linearRGB;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Menyebarkan elemen secara horizontal */
}

li button {
  padding: 5px 10px;
  background-color: #ff5555;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
}

.user-info {
  margin-right: 50px;
}

li button:hover {
  background-color: #e04141;
}
</style>
