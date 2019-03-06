import Vue from 'vue'
import Vuex from 'vuex'
import App from './store/App'
import User from './store/User'
import Content from './store/Content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App,
    User,
    Content
  },
  state: {
    // Tabs
    tabActive: 1,
    // profile
    firstTimeSetup: false
  },
  mutations: {
    SET_ACTIVE_TAB (state, tab) {
      state.tabActive = tab
    }
  },
  actions: {
    switchTab ({ commit }, tab) {
      commit('SET_ACTIVE_TAB', tab)
    }
  },
  getters: {
    currentTab (state) { return state.tabActive }
  }
})
