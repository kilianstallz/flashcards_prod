const fb = require('../db/firebaseConfig')

const state = {
  // User Auth
  currentUser: null,
  userProfile: {} // User Auth End
}
const mutations = {
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
  } // User Auth End
}
const actions = {
  // user AUth
  fetchUserProfile ({ commit, state }) {
    fb.usersCollection
      .doc(state.currentUser.uid)
      .get()
      .then(res => {
        console.log('user:', res.data())
        commit('SET_USER_PROFILE', res.data())
        localStorage.setItem('userProfile', JSON.stringify(res.data()))
      })
      .catch(err => console.log(err))
  },
  logout ({ commit }) {
    fb.auth.signOut().then(() => {
      commit('LOGOUT')
    })
  } // User Auth End
}
const getters = {
  currentUser (state) {
    return state.currentUser
  },
  userProfile (state) {
    return state.userProfile
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
