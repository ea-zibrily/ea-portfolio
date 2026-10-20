import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router/routes.js'
import scrollBehavior from './router/scroll-behavior.js'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior
  },
  ({ router, isClient }) => {
    if (isClient) {
      router.beforeEach((to, from, next) => {
        document.title = (to.meta.title ? `${to.meta.title} — ` : '') + 'Zibril Yuan Afrianto'
        next()
      })
    }
  }
)
