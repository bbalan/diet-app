import store from '.'
import { setLocalStorage } from './util'

const MODULE_KEY = 'userInfo'

// Personal info about the user
const stateDefault = {
  personal: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    birthday: null,
    birthdayTimestamp: null,
  },
  // TODO: replace default values with HTML5 form placeholder
  metrics: {
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
  },
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    prepopulate(state) {
      state.metrics.gender = 'male'
      state.metrics.height = 177
      store.commit('userInfo/setWeight', 151.6)
      state.metrics.bodyFatPct = 20
      store.commit('userInfo/setGoal', 'burn-fat')
      store.commit('userInfo/setActivityLevel', 1.2)
      store.commit('userInfo/setNumMeals', 6)
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
    },

    /** Translates the user's birthday into a timestamp, and calculates their age. */
    setBirthday(state, birthday) {
      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      state.personal.birthday = birthday
      state.personal.personal.birthdayTimestamp = birthdayTimestamp
      state.metrics.age = age

      store.commit('calendar/setUserMetrics')

      setLocalStorage(MODULE_KEY, state)
    },

    setGender(state, gender) {
      state.metrics.gender = gender
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setHeight(state, height) {
      if (!height) {
        state.metrics.height = 0
      } else {
        state.metrics.height = height
      }
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setMass(state, mass) {
      if (!mass) {
        state.metrics.mass = 0
      } else {
        state.metrics.mass = mass
      }
      store.commit('calendar/setMass', mass)
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setBodyFatPct(state, bodyFatPct) {
      state.metrics.bodyFatPct = bodyFatPct
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    // Converts between metric and lbs
    setWeight(state, weight) {
      let w = parseFloat(weight)
      let mass

      if (typeof w !== 'number') {
        w = null
        mass = null
      } else {
        w = weight

        const unitWeight = store.state.config.unitWeight

        if (unitWeight === 'kg') {
          mass = weight
        } else {
          mass = weight / 2.20462
        }
      }

      state.metrics.weight = w

      store.commit('userInfo/setMass', mass)
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')

      setLocalStorage(MODULE_KEY, state)
    },

    setNumMeals(state, numMeals) {
      state.metrics.numMeals = numMeals
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setGoal(state, goal) {
      state.metrics.goal = goal
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setGoalSpeed(state, goalSpeed) {
      state.metrics.goalSpeed = goalSpeed
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    setActivityLevel(state, activityLevel) {
      state.metrics.activityLevel = activityLevel
      store.commit('userInfo/calcTDEE')
      store.commit('calendar/setUserMetrics')
      setLocalStorage(MODULE_KEY, state)
    },

    // Calculate the TDEE using various formulas
    calcTDEE(state) {
      const bodyFatPct = state.metrics.bodyFatPct
      const mass = state.metrics.mass
      const height = state.metrics.height
      const goalSpeed = store.state.userInfo.metrics.goalSpeed

      let leanBodyMass
      let deficit

      switch (store.state.userInfo.metrics.goal) {
        case 'burn-fat':
          deficit = goalSpeed * -1
          break
        case 'build-muscle':
          deficit = goalSpeed
          break
        default:
          deficit = 0
          break
      }

      // calculate leanBodyMass
      // Body fat percentage
      if (bodyFatPct) {
        leanBodyMass = mass * (100 - bodyFatPct) / 100
      } else if (state.metrics.gender === 'male') {
        // Boer formula (1984)
        leanBodyMass = (0.407 * mass) + (0.267 * height) - 19.2
      } else {
        // Boer formula (1984)
        leanBodyMass = (0.252 * mass) + (0.473 * height) - 48.3
      }

      // Katch McArdle formula
      const basalMetabolicRate = 370 + (21.6 * leanBodyMass)

      // Multiply by activity level to get TDEE
      const tdee = basalMetabolicRate * store.state.userInfo.metrics.activityLevel + deficit

      state.metrics.tdee = tdee

      setLocalStorage(MODULE_KEY, state)
    },
  },
}
