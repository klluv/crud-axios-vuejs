<template>
  <div class="container mt-4">
    <user-add v-if="!editMode" @user-added="handleUserAdded" />
    <user-edit
      v-if="editMode"
      :user="selectedUser"
      @user-updated="handleUserUpdated"
      @cancel-update="cancelUpdate"
    />
    <user-list
      :users="users"
      @edit-user="handleEditUser"
      @user-deleted="handleUserDeleted"
    />
  </div>
</template>

<script>
import axios from 'axios';
import UserAdd from './components/UserAdd.vue';
import UserEdit from './components/UserEdit.vue';
import UserList from './components/UserList.vue';

export default {
  components: {
    UserAdd,
    UserEdit,
    UserList,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      editMode: false,
    };
  },
  methods: {
    load() {
      axios
        .get('http://localhost:3000/users')
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleUserAdded(user) {
      this.users.push(user);
    },
    handleEditUser(user) {
      this.selectedUser = user;
      this.editMode = true;
    },
    handleUserUpdated() {
      this.cancelUpdate();
      this.load();
    },
    handleUserDeleted(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
    cancelUpdate() {
      this.selectedUser = null;
      this.editMode = false;
    },
  },
  mounted() {
    this.load();
  },
};
</script>
