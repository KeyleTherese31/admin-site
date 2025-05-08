import Vue from 'vue';
import Router from 'vue-router';
import AdminDashboard from '@/components/AdminDashboard.vue';
import LoginPage from '@/components/LoginPage.vue';
import TestQuestions from '@/components/TestQuestions.vue';
import JobseekerAnswers from '@/components/JobseekerAnswers.vue';
import CVEntries from '@/components/CVEntries.vue';
import Settings from '@/components/Settings.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next({ name: 'dashboard' });
        } else {
          next();
        }
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/test-questions',
      name: 'test-questions',
      component: TestQuestions,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/jobseeker-answers',
      name: 'jobseeker-answers',
      component: JobseekerAnswers,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/cv-entries',
      name: 'cv-entries',
      component: CVEntries,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Set to true when implementing authentication logic
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
