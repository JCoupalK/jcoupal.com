import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MyProjects from '@/views/MyProjects.vue'
import MyBlog from '@/views/MyBlog.vue'
import BlogPost from '@/components/BlogPost.vue';

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
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true,
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
