import { createRouter, createWebHashHistory } from 'vue-router'
import main from '@/views/main/main.vue'
import login from '@/views/login/login.vue'
import NotFound from '@/views/404/404.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //初始路由
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/:pathMatch(.*)',
      component: NotFound
    }
  ]
})

// 路由守卫
//coding~~~~
export default router
