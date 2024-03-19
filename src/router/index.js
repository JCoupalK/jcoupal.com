import { createRouter, createWebHashHistory } from 'vue-router'
import AboutMe from '@/components/AboutMe.vue'
import MyProjects from '@/components/MyProjects.vue'
import MyExperience from '@/components/MyExperience.vue'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about-me',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/projects',
    name: 'MyProjects',
    component: MyProjects
  },
  {
    path: '/experience',
    name: 'MyExperience',
    component: MyExperience
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
