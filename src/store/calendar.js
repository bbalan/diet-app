import Vue from 'vue'
import dateFormat from 'dateformat'
import store from 'store'
import db from 'store/db'

const calendar = {
  namespaced: true,
  state: {
    today: '',
    currentDay: '',
    data: {},
  },
  actions: {
    // get data from indexeddb and commit it into the app store
    init({ commit }) {
      // console.log('dispatch calendar/init', db)

      db.calendar
        .toArray()
        .then((days) => {
          commit('init', days)
          commit('setToday')
        })
    },

    // add a day to the calendar
    add({ commit, state }, newDate) {
      // console.log('dispatch calendar/add', newDate)

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

      let userInfo

      if (state.data[formattedNearest]) {
        userInfo = state.data[formattedNearest].userInfo
      } else {
        userInfo = store ? store.state.userInfo : {
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

      const newDay = {
        date: newDate,
        massUpdated: false,
        userInfo,
        entries: [],
      }

      db.calendar
        .add(newDay)
        .then(() => {
          commit('add', newDay)
        })
    },

    entryAdd({ commit, state }, entryID) {
      // console.log('entryAdd', entryID, state.currentDay)

      db.calendar
        .where('date').equals(state.currentDay)
        .first((day) => {
          // console.log('date equals ', state.currentDay, day)
          const { date, userInfo, entries } = day
          const newEntries = entries.slice(0)
          newEntries.push(entryID)

          // console.log('updating', date, { userInfo, entries: newEntries })

          db.calendar
            .update(date, { userInfo, entries: newEntries })
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
              commit('setMassUpdated')
            })
        })
    },

    setUserInfo({ commit }, metrics) {
      console.log('dispatch calendar/setUserInfo', metrics)
      commit('setUserInfo', metrics)
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      // console.log('commit calendar/init', fromIndexedDB)
      const data = {}

      fromIndexedDB.forEach((day) => {
        const { date, userInfo, entries } = day
        data[date] = { userInfo, entries }
      })

      Vue.set(state, 'data', data)
    },

    setCurrentDay(state, currentDay) {
      currentDay = currentDay || state.today
      state.currentDay = currentDay
      // console.log('commit calendar/setCurrentDay', currentDay)

      // console.log('calendar.data[currentDay]', state.data[currentDay])

      // no data for today, create some
      if (!Object.hasOwnProperty.call(state.data, currentDay)) {
        // console.log('no data for current day', currentDay)
        store.dispatch('calendar/add', currentDay)
      }
    },

    setToday(state, today) {
      // today's date hasn't been determined yet
      if (!today) today = dateFormat(new Date(), 'yyyy-mm-dd')
      // console.log('commit calendar/setToday', today)

      state.today = today

      if (state.currentDay === '' || !state.currentDay) {
        store.commit('calendar/setCurrentDay')
      }
    },

    goToToday(state) {
      state.currentDay = state.today
    },

    add(state, newDay) {
      // console.log('commit(calendar/add)', newDay)

      const { date, userInfo, entries } = newDay
      Vue.set(state.data, date, { userInfo, entries })
      // console.log('add done', date, state.data[date], state.today)
    },

    entryAdd(state, id, date) {
      date = date || state.currentDay
      state.data[date].entries.push(id)
    },

    entryDelete(state, { id, date }) {
      const day = state.data[date]

      if (day && day.entries && day.entries.length > 0) {
        const idx = day.entries.findIndex(entry => entry.id === id)
        if (idx >= 0) day.entries.splice(idx, 1)
      }
    },

    setMassUpdated(state) {
      state.data[state.currentDay].massUpdated = true
    },

    // Store the user's data in the calendar for today.
    setUserInfo(state, newMetrics = {}) {
      // do a shallow copy to prevent reference bugs
      if (store) {
        Object.assign(newMetrics, JSON.parse(JSON.stringify(store.state.userInfo)))
      }

      console.log('commit calendar/setUserInfo', state.today, state.data[state.today])

      state.data[state.today].userInfo = newMetrics
    },
  },
}

export default calendar
