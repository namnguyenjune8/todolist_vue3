import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/app',
    name: 'App',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router