import { createRouter, createWebHistory } from 'vue-router'
import AddRecord from '@/components/AddRecord.vue'
import Main from '@/components/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
  ],
})

export default router
