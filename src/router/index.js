import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import('content/Login')
const Home = () => import('views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 挂载路由导航首位，判断是否绕过了login直接进入主页
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  const aToken = window.sessionStorage.getItem('token')
  if(!aToken) return next('/login')
  next()
})

export default router
