<template>
    <div class="container mt-4">
        <form @submit.prevent="add">
            <div class="form-group">
                <input type="text" class="form-control mb-1" v-model="form.name" placeholder="Nama" required>
                <!-- <div v-if="!form.name" class="warning">Nama harus diisi</div> -->
                <input type="text" class="form-control mb-1" v-model="form.phone" placeholder="No.Telp" required>
                <!-- <div v-if="!form.phone" class="warning">No. HP harus diisi</div> -->
                <input type="text" class="form-control" v-model="form.address" placeholder="Alamat" required>
                <!-- <div v-if="!form.address" class="warning">Alamat harus diisi</div> -->
            <button type="submit" class="btn btn-primary">Add</button>
            
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
// import { Toast } from 'vue-toastification';

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
                    // Toast.success('Data berhasil ditambahkan!', {
                    //     timeout: 2000, 
                    //     closeOnClick: true, 
                    //     pauseOnFocusLoss: true, 
                    // });
                    this.$router.push({name: 'UserList'})
                })
                .catch((error) => {
                    console.error(error);
                    // Toast.error('Terjadi kesalahan saat menambahkan data.', {
                    //     timeout: 3000,
                    //     closeOnClick: true,
                    //     pauseOnFocusLoss: true,
                    // });
                });
            }
        }
};
</script>