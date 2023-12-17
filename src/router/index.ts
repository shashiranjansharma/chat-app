import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { protedted: true },
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      meta: { protedted: true },
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/components/LoginForm.vue')
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('@/components/RegisterForm.vue')
    }
  ]
});

router.beforeEach(async (to: any) => {
  const isAuthenticated = localStorage.getItem('chat_app_token')
  if (
    !isAuthenticated &&
    !['Login', 'Register'].includes(to.name)
  ) {
    return { name: 'Login' }
  }
})

export default router;
