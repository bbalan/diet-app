import store from 'store'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'days'

// Personal info about the user
const stateDefault = {
  today: '',
  currentDay: '',
  data: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const log = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    setToday(state, today) {
      state.today = today

      if (!Object.hasOwnProperty.call(state.data, today)) {
        store.commit('days/add', today)
      }

      if (state.currentDay === '') state.currentDay = today

      setLocalStorage(MODULE_KEY, state)
    },
    add(state, day) {
      state.data[day] = {
        mass: store.state.userInfo.metrics.mass,
        tdee: store.state.userInfo.tdee,
        entries: [],
      }

      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: add day argument to add entry to any day
    entryAdd(state, { entryUUID }) {
      state.data[state.today].entries.push(entryUUID)
      setLocalStorage(MODULE_KEY, state)
    },
    setTDEE(state, tdee) {
      state.data[state.today].tdee = tdee
      setLocalStorage(MODULE_KEY, state)
    },
    setMass(state, mass) {
      state.data[state.today].mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
