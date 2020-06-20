import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import('content/Login')
const Home = () => import('views/home/Home.vue')
const Welcome = () => import('views/home/Welcome.vue')

const Users = () => import('views/user/Users.vue')

const Roles = () => import('views/rights/roles/Roles.vue')
const Rights = () => import('views/rights/rights/Rights.vue')

const Goods = () => import('views/goods/goods/Goods.vue')
const Params = () => import('views/goods/params/Params.vue')
const Categories = () => import('views/goods/categories/Categories.vue')

const Orders = () => import('views/orders/Orders')

const Reports = () => import('views/reports/Reports')


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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/orders',
        component: Orders
      },
      {
        path: '/reports',
        component: Reports
      }
    ]
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
