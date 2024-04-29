import { createRouter, createWebHistory } from 'vue-router'
import gruppspel from '../views/gruppspel.vue';
import slutspel from '../views/slutspel.vue';
import App from '../../srcadnin/App.vue';
import AdminView from '../views/AdminView.vue';

const router = createRouter({
  history: createWebHistory('/~47491/Volleyboll'),
  routes: [
    {
      path: '/AdminView',
      name: 'Adminview',
      component:AdminView
    },
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