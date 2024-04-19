import { createRouter, createWebHistory } from 'vue-router'
import gruppspel from '../views/gruppspel.vue';
import slutspel from '../views/slutspel.vue';
import adminapp from '../views/adminapp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gruppspel',
      name: 'gruppspel',
      component:gruppspel
    },
    {
      path: '/slutspel',
      name: 'slutspel',
      component:slutspel
    },
    {
      path: '/adminapp',
      name: 'adminapp',
      component:adminapp
    },
  ]
})

export default router
