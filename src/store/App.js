const state = {
  onlineStatus: 'online'
}
const mutations = {
  // Online State
  SET_OFFLINE (state) {
    state.onlineStatus = 'offline'
  },
  SET_ONLINE (state) {
    state.onlineStatus = 'online'
  } // Online State End
}
const actions = {
  // Online State
  userIsOffline ({ commit }) {
    commit('SET_OFFLINE')
  },
  userIsOnline ({ commit }) {
    commit('SET_ONLINE')
  } // Online State End
}
const getters = {
  onlineStatus (state) {
    return state.onlineStatus
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
