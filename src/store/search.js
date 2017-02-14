import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    history: {},
  },
  mutations: {
    setSearchResults(state, { query, results }) {
      Vue.set(state.history, query, results)
    },
    clearSearchResults(state) {
      state.history = {}
    },
  },
}
