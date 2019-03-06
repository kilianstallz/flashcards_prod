import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Dashboard from './views/Dashboard.vue'

// Pages
import Home from './pages/Home.vue'

// const fb = require('./db/firebaseConfig')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "AuthPage" */ './views/Auth.vue'),
      meta: {
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'home',
      component: Dashboard,
      meta: {
        authRequired: true
      },
      children: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: Home
        }
      ]
    },
    {
      path: '/profile',
      component: Dashboard,
      meta: {
        authRequired: true
      },
      children: [
        {
          name: 'Setup',
          path: '/profile/welcome',
          component: () => import(/* webpackChunkName: "welcome" */ './pages/Welcome.vue')
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

router.beforeEach((to, from, next) => {
  const isLoggedIn = firebase.auth().currentUser
  const authRequired = to.matched.some(record => record.meta.authRequired)
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  )
  console.log('routerAuthState: ', (isLoggedIn))
  console.log('storedState ', (!store.getters.currentUser || !store.getters.userProfile))
  // set user Data on page refresh
  if (isLoggedIn && (!store.getters.currentUser || !store.getters.userProfile)) {
    store.commit('SET_CURRENT_USER', isLoggedIn)
    store.dispatch('fetchUserProfile')
  }
  // check LogginStatus
  // page needs auth
  if (!(isLoggedIn) & authRequired) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
    // Page for logged out users
  } else if (isLoggedIn && onlyWhenLoggedOut) {
    console.log('onlyWhenLoggedOut')
    next({
      path: '/dashboard'
    })
  } else { next() }
  next()
})

export default router
