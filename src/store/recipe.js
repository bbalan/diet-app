import Vue from 'vue'
// import store from 'store'
import UUID from 'uuid'
import { setLocalStorage } from './util'

const MODULE_KEY = 'recipe'
const stateDefault = {}
const stateFromLocalStorage = JSON.parse(localStorage.getItem(MODULE_KEY))

const recipe = {
  namespaced: true,
  state: stateFromLocalStorage || stateDefault,
  mutations: {
    add(state, { data }) {
      const uuid = UUID.v4()
      Vue.set(state, uuid, {
        ...data,
        enabled: true,
      })
      setLocalStorage(MODULE_KEY, state)
    },

    disable(state, uuid) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    enable(state, uuid) {
      state[uuid].enabled = true
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default recipe
