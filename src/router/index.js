import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MyProjects from '@/views/MyProjects.vue'
import MyBlog from '@/views/MyBlog.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
  ]
})

export default router
