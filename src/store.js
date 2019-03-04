import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Tabs
    tabActive: 1
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
