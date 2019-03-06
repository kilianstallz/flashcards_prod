import store from '../store'
const fb = require('../db/firebaseConfig')

const state = {
  decks: null
}
const mutations = {
  SET_FETCHED_DECKS (state, decks = null) {
    state.decks = decks
  }
}
const actions = {
  fetchDecks ({ commit }) {
    let decks = []
    fb.db.collection('decks').where('creator', '==', store.getters.currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(deck => {
        decks.push(deck)
      })
      commit('SET_FETCHED_DECKS', decks.length > 0 ? decks : [])
    })
      .catch(err => console.log('fetchDeckError: ', err))
  }
}
const getters = {
  sortedDecks (state, orderBy = null) {
    return state.decks
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
