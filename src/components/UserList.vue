<template>
  <div>
    <ul class="list-group">
      <li
        v-for="user in users"
        :key="user.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <span class="user-info">{{ user.name }}</span>
          <span class="user-info">{{ user.phone }}</span>
          <span class="user-info">{{ user.address }}</span>
        </div>
        <div>
          <button @click="edit(user)" class="btn btn-primary">Edit</button>
          <button @click="del(user)" class="btn btn-danger">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['users'],
  methods: {
    edit(user) {
      this.$emit('edit-user', user);
    },
    del(user) {
      axios
        .delete('http://localhost:3000/users/' + user.id)
        .then(() => {
          this.$emit('user-deleted', user.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
