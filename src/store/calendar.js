import Vue from 'vue'
import store from 'store'
import dateFormat from 'dateformat'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'calendar' // TODO: rename this to 'calendar'

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
      if (!state.data[currentDay]) {
        store.commit('calendar/add', currentDay)
      }
    },
    setToday(state, today) {
      if (!today) {
        today = dateFormat(new Date(), 'yyyy-mm-dd')
      }

      state.today = today

      if (!Object.hasOwnProperty.call(state.data, today)) {
        store.commit('calendar/add', today)
      }

      if (state.currentDay === '') state.currentDay = today

      store.commit('calendar/setUserMetrics')
    },
    add(state, newDate) {
      // find nearest date to copy data from
      const nearestDates = Object.entries(state.data).map(
        day => Date.parse(newDate) - Date.parse(day[0])
      ).sort((a, b) => {
        if (Math.abs(a) > Math.abs(b)) return 1
        if (Math.abs(a) < Math.abs(b)) return -1
        return 0
      })

      console.log(nearestDates[0])

      // TODO: add timestamp
      Vue.set(state.data, newDate, {
        userInfo: {
          massUpdated: false,
          metrics: store.state.userInfo.metrics,
        },
        entries: [],
      })

      setLocalStorage(MODULE_KEY, state)
    },
    // TODO: add day argument to add entry to any day
    entryAdd(state, { uuid, date }) {
      state.data[date].entries.push(uuid)
      setLocalStorage(MODULE_KEY, state)
    },
    entryDelete(state, { uuid, date }) {
      let dateToDelete = date
      if (!dateToDelete) dateToDelete = state.today

      let idx = 0
      const day = state.data[date]

      if (day && day.entries) {
        const foundEntry = day.entries.find(
          (entry, index) => {
            idx = index
            return entry === uuid
          }
        )

        if (foundEntry) day.entries.splice(idx, 1)
      }
    },
    setTDEE(state, tdee) {
      state.data[state.today].userInfo.metrics.tdee = tdee
      setLocalStorage(MODULE_KEY, state)
    },
    setMass(state) {
      // state.data[state.today].userInfo.metrics.mass = mass
      state.data[state.today].userInfo.massUpdated = true
      setLocalStorage(MODULE_KEY, state)
    },

    setUserMetrics(state) {
      state.data[state.today].userInfo.metrics = store.state.userInfo.metrics
    },
  },
}

export default log
