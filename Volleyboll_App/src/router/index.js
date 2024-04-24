import { createRouter, createWebHistory } from 'vue-router'
import gruppspel from '../views/gruppspel.vue';
import slutspel from '../views/slutspel.vue';
import App from '../../srcadnin/App.vue';

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
    },
    {
      path: '/App',
      name: 'App',
      component:App
    },

  ]
})

export default router