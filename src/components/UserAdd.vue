<template>
    <div>
        <form @submit.prevent="add">
            <input type="text" v-model="form.name" placeholder="Nama">
            <input type="text" v-model="form.phone" placeholder="No.Telp">
            <input type="text" v-model="form.address" placeholder="Alamat">
            <button type="submit">Add</button>
            <button type="button" @click="backToList" >Back</button>
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
                address: ''
            }
        };
    },
    methods: {
        add() {
            axios.post('http://localhost:8080/users', this.form)
                .then(() => {
                    this.$emit('userAdded', this.form); // Emit event to notify parent component
                    this.form.name = '';
                    this.form.phone = '';
                    this.form.address = '';
                })
                .catch(error => {
                    console.error(error);
                });
        },
        backToList() {
            this.$router.push('/back-list');
        }
    }
};
</script>
