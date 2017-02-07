import Vue from 'vue'
import store from 'store'
import dateFormat from 'dateformat'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'days' // TODO: rename this to 'calendar'

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
    setCurrentDay(state, currentDay) {
      state.currentDay = currentDay
    },
    setToday(state, today) {
      if (!today) {
        today = dateFormat(new Date(), 'mm-dd-yy')
      }

      state.today = today

      if (!Object.hasOwnProperty.call(state.data, today)) {
        store.commit('days/add', today)
      }

      if (state.currentDay === '') state.currentDay = today
    },
    add(state, day) {
      Vue.set(state.data, day, {
        mass: store.state.userInfo.metrics.mass,
        tdee: store.state.userInfo.tdee,
        entries: [],
      })

      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: add day argument to add entry to any day
    entryAdd(state, { entryUUID }) {
      store.commit('days/setToday')
      state.data[state.today].entries.push(entryUUID)
      setLocalStorage(MODULE_KEY, state)
    },
    setTDEE(state, tdee) {
      store.commit('days/setToday')
      state.data[state.today].tdee = tdee
      setLocalStorage(MODULE_KEY, state)
    },
    setMass(state, mass) {
      store.commit('days/setToday')
      state.data[state.today].mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
