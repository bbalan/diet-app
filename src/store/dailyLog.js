import store from '.'
import { setLocalStorage } from './utils'

const MODULE_KEY = 'dailyLog'

// Personal info about the user
const stateDefault = {
  days: [],
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const dailyLog = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addDay(state, day) {
      state.days.push(day)
      setLocalStorage(MODULE_KEY, state)
    }
  },
}

export default dailyLog
