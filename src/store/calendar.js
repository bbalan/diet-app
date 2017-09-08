import Vue from 'vue'
import dateFormat from 'dateformat'
import store from 'store'
import db from 'store/db'

const log = {
  namespaced: true,
  state: {
    today: '',
    currentDay: '',
    data: [],
  },
  actions: {
    init({ commit }) {
      db.calendar
        .toArray()
        .then((days) => { commit('calendar/init', days) })
    },
    add({ commit }, newDate) {
      // find nearest date to copy data from
      const nearestDates = Object.entries(store.state.calendar.data).map(
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

      if (store.state.calendar.data[formattedNearest]) {
        metrics = store.state.calendar.data[formattedNearest].userInfo.metrics
      } else {
        metrics = store.state.userInfo.metrics
      }

      db.calendar
        .add({
          newDate,
          userInfo: { massUpdated: false, metrics },
          entries: [],
        }, newDate)
        .then(() => {
          commit('add', {
            newDate,
            userInfo: { massUpdated: false, metrics },
            entries: [],
          })
        })
    },
    entryAdd({ commit }, entryID) {
      db.calendar
        .where('date').equals(store.state.calendar.currentDay)
        .then((day) => {
          const { date, userInfo, entries } = day
          const newEntries = entries.slice(0)
          newEntries.push(entryID)

          db.calendar
            .update(day.id, { date, userInfo, entries: newEntries })
            .then(() => {
              commit('entryAdd', entryID)
            })
        })
    },
    entryDelete({ commit }, entry) {
      const id = entry.id
      const entryDate = entry.date

      db.calendar
        .where('date').equals(entryDate)
        .then((day) => {
          const { date, userInfo, entries } = day
          const newEntries = entries.slice(0)
          newEntries.splice(entries.indexOf(id), 1)

          db.calendar
            .update(day.id, { date, userInfo, entries: newEntries })
            .then(() => {
              commit('entryDelete', { id, date })
            })
        })
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      state.data = fromIndexedDB
    },

    setCurrentDay(state, currentDay) {
      state.currentDay = currentDay
      if (!state.data[currentDay]) {
        store.commit('calendar/add', currentDay)
      }
      // setLocalStorage(MODULE_KEY, state)
    },

    setToday(state, today) {
      // today's date hasn't been determined yet
      if (!today) today = dateFormat(new Date(), 'yyyy-mm-dd')

      state.today = today

      // no data for today, create some
      if (!Object.hasOwnProperty.call(state.data, today)) {
        store.commit('calendar/add', today)
      }

      if (state.currentDay === '') state.currentDay = today

      store.commit('calendar/setUserMetrics')
    },

    goToToday(state) {
      state.currentDay = state.today
    },

    add(state, newDay) {
      Vue.set(state.data, [...state.data, newDay])
    },

    // TODO: add day argument to add entry to any day
    entryAdd(state, id) {
      state.data
        .find(day => day.date === state.currentDay)
        .entries.push(id)
    },

    entryDelete(state, { id, date }) {
      const day = state.data.find(d => d.date === date)

      if (day && day.entries && day.entries.length > 0) {
        const idx = day.entries.findIndex(entry => entry.id === id)
        if (idx >= 0) day.entries.splice(idx, 1)
      }
    },

    // @TODO: port this to indexeddb
    setMass(state) {
      state.data[state.currentDay].userInfo.massUpdated = true
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
