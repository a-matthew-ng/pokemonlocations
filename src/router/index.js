import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'loginPage',
    component: LoginPage
  },
  {
    path: "/homePage",
    name: "homePage",
    component: HomePage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
