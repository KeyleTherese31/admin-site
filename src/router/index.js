// src/router/index.js

import Vue from 'vue';
import Router from 'vue-router';
import WelcomePage from '@/views/WelcomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
// import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ],
});

export default router;
