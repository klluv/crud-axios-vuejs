<template>
  <div class="container mt-5">
      <form @submit.prevent="update">
          <input type="hidden" v-model="form.id">
            <div class="form-group">
                <input type="text" class="form-control mb-1" v-model="form.name" placeholder="Nama" required>
                <input type="text" class="form-control mb-1" v-model="form.phone" placeholder="No.Telp" required>
                <input type="text" class="form-control" v-model="form.address" placeholder="Alamat" required>
            </div>
          <button @click="update(form)" class="btn btn-primary mt-2" >Update</button>
      </form>   
      
      <ul class="list-unstyled mt-3 list-group">
          <li :key="user.id" v-for="user in users" class="list-group-item">
            <div class="user-info-list d-flex  justify-content-between">
                <span class="user-info-item"><strong>Nama:</strong> {{ user.name }}</span>
                <span class="user-info-item"><strong>No. Hp:</strong> {{ user.phone }}</span>
                <span class="user-info-item"><strong>Alamat:</strong> {{ user.address }}</span>
                </div>
              <div>
              <button @click="edit(user)" class="btn btn-secondary">Edit</button>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
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
              // updateSubmit: false
          }
      },
      methods: {
          load() {
              axios.get('http://localhost:8080/users').then(res => {
                  this.users = res.data 
              }).catch((err) => {
                  console.log(err);
              })
           },
          edit(user) {
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
}).then(() => {
                  this.load()
                  this.form.id = ''
                  this.form.name = ''
                  this.form.phone = ''
                  this.form.address = ''
                  this.$router.push({name: 'UserList'})
                  // this.updateSubmit = false
              }).catch((err) => {
                  console.log(err);
                
              })
          },
          
        },
        mounted() {
          this.load()
      },
      } 
  
</script>
