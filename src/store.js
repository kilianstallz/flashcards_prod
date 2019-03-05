import Vue from 'vue'
import Vuex from 'vuex'

// Modules import
const fb = require('./db/firebaseConfig')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Tabs
    tabActive: 1,
    // User Auth
    currentUser: null,
    userProfile: {},
    // profile
    firstTimeSetup: false
  },
  mutations: {
    SET_ACTIVE_TAB (state, tab) {
      state.tabActive = tab
    },
    // User auth
    SET_CURRENT_USER (state, val) {
      state.currentUser = val
    },
    SET_USER_PROFILE (state, val) {
      state.userProfile = val
    },
    LOGOUT (state) {
      state.currentUser = null
      state.userProfile = {}
    }
  },
  actions: {
    switchTab ({ commit }, tab) {
      commit('SET_ACTIVE_TAB', tab)
    },
    // user AUth
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          console.log('user:', res.data())
          commit('SET_USER_PROFILE', res.data())
        })
        .catch(err => console.log(err))
    },
    logout ({ commit }) {
      fb.auth.signOut().then(() => {
        commit('LOGOUT')
      })
    }
  },
  getters: {
    currentTab (state) { return state.tabActive }
  }
})
