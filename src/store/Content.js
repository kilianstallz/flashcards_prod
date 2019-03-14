import store from '../store'
const fb = require('../db/firebaseConfig')

const state = {
  decks: null,
  contentLoading: false
}
const mutations = {
  SET_FETCHED_DECKS (state, decks = null) {
    state.decks = decks
  },
  CONTENT_LOADING (state, bool = false) {
    state.contentLoading = bool
  }
}
const actions = {
  fetchDecks ({ commit }) {
    let decks = []
    commit('CONTENT_LOADING', true)
    fb.db.collection('decks').where('creator', '==', store.getters.currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(deck => {
        decks.push(deck)
      })
      commit('SET_FETCHED_DECKS', decks.length > 0 ? decks : [])
      commit('CONTENT_LOADING')
    })
      .catch(err => {
        console.log('fetchDeckError: ', err)
        commit('CONTENT_LOADING')
        window.alert('An error occured... Retry or log in again!')
      })
  }
}
const getters = {
  sortedDecks (state, orderBy = null) {
    return state.decks
  },
  contentLoading (state) {
    return state.contentLoading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
