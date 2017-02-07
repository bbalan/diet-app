import Vue from 'vue'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'exerciseCache'

// Personal info about the user
const stateDefault = {}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const exerciseCache = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, { uuid, data }) {
      Vue.set(state, uuid, data)
      setLocalStorage(MODULE_KEY, state)
    },
    edit(state, { uuid, data }) {
      state[uuid] = data
      setLocalStorage(MODULE_KEY, state)
    },
    delete(state, { uuid }) {
      state[uuid] = undefined
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default exerciseCache
