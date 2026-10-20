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
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'Portfolio' }
  },
  {
    path: '/certificate',
    name: 'certificate',
    component: () => import('../views/CertificateView.vue'),
    meta: { title: 'Certificate' }
  }
]
