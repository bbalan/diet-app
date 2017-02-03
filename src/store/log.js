import { setLocalStorage } from './util'

const MODULE_KEY = 'log'

// Personal info about the user
const stateDefault = {
  days: {},
  entries: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const log = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addDay(state, day) {
      state.days.push(day)
      setLocalStorage(MODULE_KEY, state)
    },
    addEntry(state, { id, data }) {
      state.entries[id] = {
        foodID: data.id,
        qty: data.quantity,
      }

      // TODO: push entry idx to current day

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
