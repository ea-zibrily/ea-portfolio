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
    path: '/project/:slug',
    name: 'project',
    component: () => import('../views/ProjectDetailView.vue')
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
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundView.vue')
  }
]
