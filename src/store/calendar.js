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
      setLocalStorage(MODULE_KEY, state)
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

    goToToday(state) {
      state.currentDay = state.today
    },

    add(state, newDate) {
      // find nearest date to copy data from
      const nearestDates = Object.entries(state.data).map(
        day => Date.parse(day[0]) - Date.parse(newDate)
      ).sort((a, b) => {
        if (Math.abs(a) > Math.abs(b)) return 1
        if (Math.abs(a) < Math.abs(b)) return -1
        return 0
      })

      const newTimestamp = Date.parse(newDate)
      const nearestTimestamp = newTimestamp + nearestDates[0]
      const nearestDate = new Date(nearestTimestamp)
      const year = nearestDate.getUTCFullYear()
      // add trailing 0, get last 2 digits
      const month = `0${nearestDate.getUTCMonth() + 1}`.slice(-2)
      const day = `0${nearestDate.getUTCDate()}`.slice(-2)
      const formattedNearest = `${year}-${month}-${day}`

      // console.log(`Copying metrics from ${formattedNearest}`)

      let metrics

      if (state.data[formattedNearest]) {
        metrics = state.data[formattedNearest].userInfo.metrics
      } else {
        metrics = store.state.userInfo.metrics
      }

      Vue.set(state.data, newDate, {
        userInfo: {
          massUpdated: false,
          metrics,
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

    setMass(state) {
      state.data[state.currentDay].userInfo.massUpdated = true
      setLocalStorage(MODULE_KEY, state)
    },

    setUserMetrics(state) {
      // do a shallow copy to prevent reference bugs
      const newMetrics = {}
      Object.assign(newMetrics, store.state.userInfo.metrics)
      state.data[state.currentDay].userInfo.metrics = newMetrics
    },
  },
}

export default log
