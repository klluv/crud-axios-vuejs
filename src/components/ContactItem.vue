<!-- ContactItem.vue -->
<template>
    <li class="student-table" >
      {{ student.id }}. {{ student.name }} - {{ student.phone }} - {{ student.address }}
      <button @click="editStudent">Edit</button>
      <button @click="deleteStudent">Hapus</button>
    </li>
  </template>
  
  <script>
  export default {
    props: ['student'],
    methods: {
      editStudent() {
        this.$emit('edit', this.student);
      },
      deleteStudent() {
        this.$emit('delete', this.student.id);
      }
    }
  };
  </script>

<style scoped>
/* ContactItem.vue style */
.student-table {
  list-style: none;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00203fff;
  color: aliceblue;
}

button {
  cursor: pointer;
  background-color: #adefd1ff;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
}

button:hover {
  background-color: rgb(0, 103, 206);
}
</style>
  