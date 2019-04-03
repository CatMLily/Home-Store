import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/clothes',
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      name: 'lists',
      component: Home,
      children: [
        { path: '/clothes', name: 'clothes', component: () => import('./views/List.vue') },
        { path: '/shoes', name: 'shoes', component: () => import('./views/List.vue') },
        { path: '/decorations', name: 'decorations', component: () => import('./views/List.vue') },
        { path: '/bjd', name: 'bjd', component: () => import('./views/List.vue') },
        { path: '/add', name: 'add', component: () => import('./views/Add.vue') },
      ],
    },
  ],
});
