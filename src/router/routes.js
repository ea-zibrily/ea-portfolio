// src/router/routes.js
import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    redirect: '/#about'
  },
  {
    path: '/portfolio',
    redirect: '/#portfolio'
  },
  {
    path: '/certificate',
    redirect: '/#certificates'
  }
]
