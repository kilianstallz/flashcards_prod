import Vue from 'vue'
// TODO: Only Pick parts that are needed
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/scss/theme.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

const fb = require('./db/firebaseConfig')

Vue.use(VueMaterial)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
