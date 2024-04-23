import { createRouter, createWebHistory } from 'vue-router'
import gruppspel from '../views/gruppspel.vue';
import slutspel from '../views/slutspel.vue';

const router = createRouter({
  history: createWebHistory('/~47484/Volleyboll/'),
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
    }
  ]
})

export default router