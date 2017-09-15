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
    // get data from indexeddb and commit it into the app store
    init({ commit }) {
      console.log('dispatch calendar/init')
      db.calendar
        .toArray()
        .then((days) => { commit('calendar/init', days) })
    },

    // add a day to the calendar
    add({ commit, state }, newDate) {
      console.log('dispatch calendar/add', newDate)

      // find nearest date to clone user data from (the user will modify weight, etc later)
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
        metrics = store ?
          store.state.userInfo.metrics : {
            age: undefined,
            gender: undefined,
            height: undefined,
            weight: undefined,
            bodyFatPct: undefined,
            mass: undefined,
            tdee: undefined,
            numMeals: null, // TODO: expose this to user
            mealStops: [],
            goal: undefined,
            goalSpeed: 500,
            activityLevel: undefined,
          }
      }

      db.calendar
        .add({
          date: newDate,
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

    entryAdd({ commit, state }, entryID) {
      db.calendar
        .where('date').equals(state.currentDay)
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

    setMassUpdated({ commit, state }) {
      db.calendar
        .get(state.currentDay)
        .then((day) => {
          db.calendar
            .update(state.currentDay, {
              ...day,
              userInfo: {
                ...day.userInfo,
                massUpdated: true,
              },
            })
            .then(() => {
              commit('setMass')
            })
        })
    },

    setUserMetrics({ commit }, metrics) {
      commit('setUserMetrics', metrics)
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      state.data = fromIndexedDB
    },

    setCurrentDay(state, currentDay) {
      console.log('commit setCurrentDay', currentDay)
      state.currentDay = currentDay || state.today

      if (!state.data[currentDay]) {
        console.log('no data for current day')
        store.dispatch('calendar/add', currentDay)
      }
    },

    setToday(state, today) {
      console.log('commit calendar/setToday', today)

      // today's date hasn't been determined yet
      if (!today) today = dateFormat(new Date(), 'yyyy-mm-dd')
      console.log('dispatch calendar/setToday', today)

      state.today = today

      // no data for today, create some
      if (!Object.hasOwnProperty.call(state.data, today)) {
        console.log('no data for today')
        store.dispatch('calendar/add', today)
      }

      if (state.currentDay === '' || !state.currentDay) {
        store.commit('calendar/setCurrentDay')
      }
    },

    goToToday(state) {
      state.currentDay = state.today
    },

    add(state, newDay) {
      console.log('commit calendar/add', newDay)

      Vue.set(state, 'data', state.data.concat([newDay]))
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
    setMassUpdated(state) {
      state.data[state.currentDay].userInfo.massUpdated = true
    },

    setUserMetrics(state, newMetrics = {}) {
      // do a shallow copy to prevent reference bugs
      if (store) {
        Object.assign(newMetrics, store.state.userInfo.metrics)
      }

      console.log('setUserMetrics currentDay', state.currentDay, state.data[state.currentDay])

      state.data[state.currentDay].userInfo.metrics = newMetrics
    },
  },
}

export default log
