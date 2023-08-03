<template>
    <div>
        <h2>User List</h2>
        <button @click="goToAddUser">ADD DATA</button>
        <ul>
            <li v-for="user in users" :key="user.id">
                <div>
                    <span class="user-info">{{ user.name }}</span>
                    <span class="user-info">{{ user.phone }}</span>
                    <span class="user-info">{{ user.address }}</span>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
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
            users: []
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
        goToAddUser() {
            this.$router.push('/add');
        },
        // Event handler to handle 'userAdded' event
        userAddedHandler(user) {
            this.users.push(user); // Add the newly added user to the 'users' array
        }
    },
    created() {
        // Listen to the 'userAdded' event emitted by the 'UserAdd' component
        this.$root.$on('userAdded', this.userAddedHandler);
    },
    beforeDestroy() {
        // Make sure to remove the event listener when the component is destroyed
        this.$root.$off('userAdded', this.userAddedHandler);
    }
};
</script>
