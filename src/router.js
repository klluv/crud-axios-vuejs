import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from './components/UserList.vue';
import UserAdd from './components/UserAdd.vue';
import UserUpdate from './components/UserUpdate.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/back-list', name:'UserList' }, // Redirect root path to UserList.vue
  { path: '/back-list', component: UserList },
  { path: '/user-add', component: UserAdd, name:'UserAdd' },
  { path: '/update/:id', component: UserUpdate, name: 'UserUpdate'},
];

const router = new VueRouter({
  routes,
});

export default router;
