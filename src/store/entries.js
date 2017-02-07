import Vue from 'vue'
import store from 'store'
import uuid from 'uuid'
import { setLocalStorage } from './util'

const MODULE_KEY = 'entries'

// Personal info about the user
const stateDefault = {
  data: {}, // TODO: remove this and just add stuff to the root
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const entries = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, { item, type, data }) {
      const entryUUID = uuid.v4()
      Vue.set(state.data, entryUUID, { item, type, data, enabled: true })
      store.commit('days/entryAdd', { entryUUID })
      setLocalStorage(MODULE_KEY, state)
    },
    edit(state, { entryUUID, data }) {
      if (!state.data[entryUUID]) {
        console.error(`Entry ${entryUUID} not found`)
        return
      }
      state.data[entryUUID].data = data
      setLocalStorage(MODULE_KEY, state)
    },
    delete(state, { entryUUID }) {
      state.data[entryUUID] = undefined
      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: make this affect tdee in Day & Macros components
    disable(state, { entryUUID }) {
      state.data[entryUUID].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: make this affect tdee in Day & Macros components
    enable(state, { entryUUID }) {
      state.data[entryUUID].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default entries
