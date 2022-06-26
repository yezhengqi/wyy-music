import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Common from '@/views/Common'
import Search from '@/views/Search'
import Play from '@/views/Play'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: Layout,
    redirect: 'layout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
        meta: { title: '搜索' }
      },
      {
        path: 'comment',
        name: 'view-comment',
        component: Common,
        meta: { title: '评论' }
      }
    ]
  },

  {
    path: '/play',
    component: Play
  }

]

const router = new VueRouter({
  routes
})

export default router
