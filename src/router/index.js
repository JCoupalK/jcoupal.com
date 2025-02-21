import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MyProjects from '@/views/MyProjects.vue'
import MyBlog from '@/views/MyBlog.vue'
import KeepSecBlog from '@/views/KeepSecBlog.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    {
      path: '/blog-ks',
      name: 'KeepSecBlog',
      component: KeepSecBlog
    },
  ]
})

export default router
