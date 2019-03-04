import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

// Pages
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "AuthPage" */ './views/Auth.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "WelcomeSetup" */ './views/Welcome.vue')
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'home',
      component: Dashboard,
      children: [
        {
          path: '/dashboard',
          component: Home
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
