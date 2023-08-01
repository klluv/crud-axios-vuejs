<!-- ContactsList.vue -->
<template>
  <div class="student-title">
    <h1>Daftar Siswa</h1>
    <div class="input-container">
      <input v-model="newStudent.name" type="text" placeholder="Nama">
      <input v-model="newStudent.phone" type="text" placeholder="No. HP">
      <input v-model="newStudent.address" type="text" placeholder="Alamat">
      <button @click="addStudent">Tambah</button>
    </div>
    <ul>
      <contact-item v-for="student in students" :key="student.id" :student="student" @edit="editStudent" @delete="deleteStudent" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import ContactItem from './ContactItem.vue';

export default {
  components: {
    ContactItem,
  },
  data() {
    return {
      students: [
        
      ],
      newStudent: {
        name: '',
        phone: '',
        address: '',
      },
      editingStudent: null,
    };
  },
  methods: {
    fetchData() {
      axios.get('http://192.168.110.40:1234/student')
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addStudent() {
      if (this.newStudent.name && this.newStudent.phone && this.newStudent.address) {
        if (this.editingStudent) {
          axios.put(`http://192.168.110.40:1234/student${this.editingStudent.id}`, this.newStudent)
            .then(response => {
              this.editingStudent.name = this.newStudent.name;
              this.editingStudent.phone = this.newStudent.phone;
              this.editingStudent.address = this.newStudent.address;
              this.editingStudent = null; 
              return response
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          axios.post('http://192.168.110.40:1234/student', this.newStudent)
            .then(response => {
              this.students.push(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }
        this.newStudent.name = '';
        this.newStudent.phone = '';
        this.newStudent.address = '';
      }
    },
    editStudent(student) {
      this.editingStudent = {
        id: student.id,
        name: student.name,
        phone: student.phone,
        address: student.address,
      };
      this.newStudent.name = student.name;
      this.newStudent.phone = student.phone;
      this.newStudent.address = student.address;
    },
    deleteStudent(id) {
      axios.delete(`http://192.168.110.40:1234/student${id}`)
        .then(response => {
          this.students = this.students.filter(student => student.id !== id);
          return response
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>


<style scoped>
.student-title {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  color: #00203fff;
  background-color: #adefd1ff;
  border-radius: 5px;
}

.input-container {
  display: flex;
  flex-direction: column; /* Mengatur elemen input berjejer ke bawah */
  align-items: flex-start; /* Mengatur elemen input agar rata kiri */
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-container input {
  flex: 1;
  padding: 5px 10px;
  margin-right: 10px;
}

.input-item

button {
  cursor: pointer;
  background-color: #4CAF50;
  color: yellow;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
}

button:hover {
  background-color: #adefd1ff;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  margin: 5px 0;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>