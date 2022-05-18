import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import { routes } from '@/routes.js'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/base.postcss'
import ky from 'ky'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)

const api = ky.create({
  prefixUrl: `${import.meta.env.VITE_API_URL}slide/`,
  headers: { 'X-API-KEY': sessionStorage.getItem("X-API-KEY") }
})
app.provide('$api', api)

app.mount('#app')
