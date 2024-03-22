import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MyProjects from '@/views/MyProjects.vue'
import MyBlog from '@/views/MyBlog.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/projects',
    name: 'MyProjects',
    component: MyProjects
  },
  {
    path: '/blog',
    name: 'MyBlog',
    component: MyBlog
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
