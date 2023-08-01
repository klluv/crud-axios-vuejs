<template>
  <div>
    <form @submit.prevent="add">
      <input type="text" v-model="form.name" placeholder="Nama">
      <input type="text" v-model="form.phone" placeholder="No.Telp">
      <input type="text" v-model="form.address" placeholder="Alamat">
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
      },
    };
  },
  methods: {
    add() {
      axios
        .post('http://localhost:3000/users', this.form)
        .then((res) => {
          this.$emit('user-added', res.data);
          this.form.name = '';
          this.form.phone = '';
          this.form.address = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
