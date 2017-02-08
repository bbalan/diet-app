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
      const date = store.state.days.currentDay
      Vue.set(state.data, entryUUID, {
        item,
        type,
        data,
        enabled: true,
        date,
      })
      store.commit('days/entryAdd', { entryUUID, date })
      setLocalStorage(MODULE_KEY, state)
    },
    edit(state, { entryUUID, data }) {
      if (!state.data[entryUUID]) return
      state.data[entryUUID].data = data
      setLocalStorage(MODULE_KEY, state)
    },
    delete(state, { entryUUID }) {
      if (state.data[entryUUID]) {
        const date = state.data[entryUUID].date
        state.data[entryUUID] = undefined

        store.commit('days/entryDelete', {
          uuid: entryUUID,
          date,
        })
        setLocalStorage(MODULE_KEY, state)
      }
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
