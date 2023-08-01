<template>
  <div>
    <form @submit.prevent="update">
      <input type="text" v-model="formData.name" placeholder="Nama">
      <input type="text" v-model="formData.phone" placeholder="No.Telp">
      <input type="text" v-model="formData.address" placeholder="Alamat">
      <button type="submit">Update</button>
      <button @click="cancelUpdate" type="button">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['user'],
  data() {
    return {
      formData: {
        id: '',
        name: '',
        phone: '',
        address: '',
      },
    };
  },
  methods: {
    update() {
      axios
        .put('http://localhost:3000/users/' + this.formData.id, {
          name: this.formData.name,
          phone: this.formData.phone,
          address: this.formData.address,
        })
        .then(() => {
          this.$emit('user-updated');
          this.cancelUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelUpdate() {
      this.$emit('cancel-update');
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        this.formData.id = newUser.id;
        this.formData.name = newUser.name;
        this.formData.phone = newUser.phone;
        this.formData.address = newUser.address;
      },
    },
  },
};
</script>
