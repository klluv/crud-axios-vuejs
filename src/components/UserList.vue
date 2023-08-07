<template>
    <div class="container mt-5">
        <h2>User List</h2>
        <div class="d-flex justify-content-between mb-3">
            <button :to="{name:'UserAdd'}" class="btn btn-primary mt-2" @click="goToAddUser">ADD DATA</button> 
            <button :to="{name:'UserUpdate'}" class="btn btn-info mb-2" @click="goToUpdate">EDIT DATA</button>
        </div>
        <ul class="list-group">
            <li v-for="user in users" :key="user.id" class="list-group-item">
                <div class="user-info-list d-flex  justify-content-between">
                    <span class="user-info-item"><strong>Nama:</strong> {{ user.name }}</span>
                    <span class="user-info-item"><strong>No. Hp:</strong> {{ user.phone }}</span>
                    <span class="user-info-item"><strong>Alamat:</strong> {{ user.address }}</span>
                </div>
                <div>
                    <b-button size="sm" @click="confirmDelUser(user)" class="btn btn-danger mt-2">Delete</b-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: {
                 id: '',
                  name: '',
                  phone: '',
                  address: ''
              }
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            axios.get('http://localhost:8080/users')
                .then(res => {
                    this.users = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        del(user) {
              axios.delete('http://localhost:8080/users/delete/' + user.id).then(() => {
                  this.load();
                  let index = this.users.indexOf(user.id);
                  this.users.splice(index, 1);
              });
          },
        goToAddUser() {
            this.$router.push({name: 'UserAdd'});
        },
        goToUpdate() {
            this.$router.push({name: 'UserUpdate'});
        },
        userAddedHandler(user) {
            this.users.push(user); 
        },
        confirmDelUser(user) {
            this.$confirm("Are you sure you want to delete this user?", "Confirmation", {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
            .then(() => {
                this.del(user);
            })
            .catch(() => {
                // Do nothing if user cancels
            });
        },
    created() {
        this.$root.$on('userAdded', this.userAddedHandler);
    },
    beforeDestroy() {
        this.$root.$off('userAdded', this.userAddedHandler);
    }
  }
};  
</script>
