import Vue from 'vue'
import store from 'store'
import UUID from 'uuid'
import { setLocalStorage } from './util'

const MODULE_KEY = 'entries'

// Personal info about the user
const stateDefault = {}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const entries = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, { item, type, data }) {
      const uuid = UUID.v4()
      const date = store.state.days.currentDay
      Vue.set(state, uuid, {
        item,
        type,
        data,
        enabled: true,
        checked: false,
        date,
      })
      store.commit('days/entryAdd', { uuid, date })
      setLocalStorage(MODULE_KEY, state)
    },

    edit(state, { uuid, data }) {
      if (!state[uuid]) return
      state[uuid].data = data
      setLocalStorage(MODULE_KEY, state)
    },

    delete(state, { uuid }) {
      if (state[uuid]) {
        const date = state[uuid].date
        state[uuid] = undefined

        store.commit('days/entryDelete', { uuid, date })
        setLocalStorage(MODULE_KEY, state)
      }
    },

    // TODO: make this affect tdee in Day & Macros components
    disable(state, { uuid }) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    // TODO: make this affect tdee in Day & Macros components
    enable(state, { uuid }) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    setMass(state, { uuid, mass }) {
      state[uuid].data.mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default entries
