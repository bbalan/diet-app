import dateFormat from 'dateformat'
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
    entryAdd(state, { entryUUID, foodUUID, mass }) {
      state.entries[entryUUID] = {
        foodUUID,
        mass,
      }

      const today = dateFormat(new Date(), 'mm-dd-yy')

      if (!Object.hasOwnProperty.call(state.days, today)) {
        state.days[today] = {
          weight: null,
          tdee: null,
          entries: [],
        }
      }

      state.days[today].entries.push(entryUUID)

      setLocalStorage(MODULE_KEY, state)
    },
    entryEdit(state, { entryUUID, mass }) {
      state.entries[entryUUID].mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
    entryDelete(state, { entryUUID }) {
      state.entries[entryUUID] = undefined
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
