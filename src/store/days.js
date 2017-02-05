import store from 'store'
import dateFormat from 'dateformat'
import { setLocalStorage } from './util'

const MODULE_KEY = 'days'

// Personal info about the user
const stateDefault = {
  data: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const log = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, day) {
      state.data[day] = {
        weight: null,
        tdee: null,
        entries: [],
      }

      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: add day argument to add entry to any day
    entryAdd(state, { entryUUID }) {
      const today = dateFormat(new Date(), 'mm-dd-yy')

      if (!Object.hasOwnProperty.call(state.data, today)) {
        store.commit('days/add', today)
      }

      state.data[today].entries.push(entryUUID)

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
