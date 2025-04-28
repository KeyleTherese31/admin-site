import Vue from 'vue';
import Router from 'vue-router';
import AdminDashboard from '@/components/AdminDashboard.vue';
import LoginPage from '@/components/LoginPage.vue';
import TestQuestions from '@/components/TestQuestions.vue';
import JobseekerAnswers from '@/components/JobseekerAnswers.vue';
import CVEntries from '@/components/CVEntries.vue';
import Settings from '@/components/Settings.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/test-questions',
      name: 'test-questions',
      component: TestQuestions,
      meta: { requiresAuth: true },
    },
    {
      path: '/jobseeker-answers',
      name: 'jobseeker-answers',
      component: JobseekerAnswers,
      meta: { requiresAuth: true },
    },
    {
      path: '/cv-entries',
      name: 'cv-entries',
      component: CVEntries,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { requiresAuth: true },
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
