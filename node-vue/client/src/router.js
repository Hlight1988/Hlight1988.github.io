import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Register from './views/Register'
import NoFound from './views/NoFound'
import Login from './views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component:Index
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '*',
      name: '404',
      component:NoFound
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();
    }else{
        isLogin ? next() : next('/login')
    }
})
export default router;
