import store from 'store'
import uuid from 'uuid'
import { setLocalStorage } from './util'

const MODULE_KEY = 'entries'

// Personal info about the user
const stateDefault = {
  data: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const entries = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, { item, type, mass }) {
      const entryUUID = uuid.v4()

      state.data[entryUUID] = {
        item,
        type,
        mass,
      }

      store.commit('days/entryAdd', { entryUUID })

      setLocalStorage(MODULE_KEY, state)
    },
    edit(state, { entryUUID, mass }) {
      state.data[entryUUID].mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
    delete(state, { entryUUID }) {
      state.data[entryUUID] = undefined
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default entries
