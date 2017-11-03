// Personal info about the user

import store from 'store'
import { db, setKeyValue } from 'store/db'

export default {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    birthday: null,
    // TODO: replace default values with HTML5 form placeholder
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
  actions: {
    init({ commit }) {
      db.userInfo
        .toArray()
        .then((userInfo) => { commit('init', userInfo) })
    },
    prepopulate({ dispatch }) {
      Promise.all([
        dispatch('setGender', 'male'),
        dispatch('setHeight', 177),
        dispatch('setWeight', 151.6),
        dispatch('setBodyFatPct', 20),
        dispatch('setGoal', 'burn-fat'),
        dispatch('setActivityLevel', 1.2),
        dispatch('setNumMeals', 6),
        dispatch('setTdee'),
      ]).then(() => {
        store.dispatch('calendar/setUserMetrics')
      })
    },
    setFirstName({ commit }, firstName) {
      setKeyValue({ commit }, 'userInfo', 'firstName', firstName)
    },
    setLastName({ commit }, lastName) {
      setKeyValue({ commit }, 'userInfo', 'lastName', lastName)
    },
    setFullName({ commit }, fullName) {
      setKeyValue({ commit }, 'userInfo', 'fullName', fullName)
    },
    setEmail({ commit }, email) {
      setKeyValue({ commit }, 'userInfo', 'email', email)
    },
    setBirthday({ commit }, birthday) {
      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      setKeyValue({ commit }, 'userInfo', 'birthday', birthdayTimestamp)
      setKeyValue({ commit }, 'userInfo', 'setAge', age)
    },
    setAge({ commit }, age) {
      setKeyValue({ commit }, 'userInfo', 'setAge', age)
    },
    setGender({ commit }, gender) {
      setKeyValue({ commit }, 'userInfo', 'setGender', gender)
    },
    setHeight({ commit }, height) {
      setKeyValue({ commit }, 'userInfo', 'setHeight', height)
    },
    setWeight({ commit }, weight) {
      setKeyValue({ commit }, 'userInfo', 'setWeight', weight)
    },
    setBodyFatPct({ commit }, bodyFatPct) {
      setKeyValue({ commit }, 'userInfo', 'setBodyFatPct', bodyFatPct)
    },
    setMass({ commit }, mass) {
      setKeyValue({ commit }, 'userInfo', 'setMass', mass)
    },
    setTdee({ commit }, tdee) {
      setKeyValue({ commit }, 'userInfo', 'setTdee', tdee)
    },
    setNumMeals({ commit }, numMeals) {
      setKeyValue({ commit }, 'userInfo', 'setNumMeals', numMeals)
    },
    // setMealStops({ commit }, mealStops) {
    //   setKeyValue({ commit }, 'userInfo', 'mealStops', mealStops)
    // },
    setGoal({ commit }, goal) {
      setKeyValue({ commit }, 'userInfo', 'setGoal', goal)
    },
    setGoalSpeed({ commit }, goalSpeed) {
      setKeyValue({ commit }, 'userInfo', 'setGoalSpeed', goalSpeed)
    },
    setActivityLevel({ commit }, activityLevel) {
      setKeyValue({ commit }, 'userInfo', 'setActivityLevel', activityLevel)
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      console.log('commit(userInfo/init)', fromIndexedDB)

      state.firstName = fromIndexedDB.firstName
      state.lastName = fromIndexedDB.lastName
      state.fullName = fromIndexedDB.fullName
      state.email = fromIndexedDB.email
      state.birthday = fromIndexedDB.birthday
      state.age = fromIndexedDB.age
      state.gender = fromIndexedDB.gender
      state.height = fromIndexedDB.height
      state.weight = fromIndexedDB.weight
      state.bodyFatPct = fromIndexedDB.bodyFatPct
      state.mass = fromIndexedDB.mass
      state.tdee = fromIndexedDB.tdee
      state.numMeals = fromIndexedDB.numMeals
      state.mealStops = fromIndexedDB.mealStops
      state.goal = fromIndexedDB.goal
      state.goalSpeed = fromIndexedDB.goalSpeed
      state.activityLevel = fromIndexedDB.activityLevel
    },

    /** Translates the user's birthday into a timestamp, and calculates their age. */
    setBirthday(state, birthday) {
      console.log('commit userInfo/setBirthday')
      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      state.personal.birthday = birthday
      state.personal.personal.birthdayTimestamp = birthdayTimestamp
      state.age = age

      store.dispatch('calendar/setUserMetrics')
    },

    setGender(state, gender) {
      console.log('commit userInfo/setGender')
      state.gender = gender
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setHeight(state, height) {
      console.log('commit userInfo/setHeight')
      if (!height) {
        state.height = 0
      } else {
        state.height = height
      }
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setMass(state, mass) {
      console.log('commit userInfo/setMass')
      if (!mass) {
        state.mass = 0
      } else {
        state.mass = mass
      }
      store.dispatch('calendar/setMassUpdated')
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setBodyFatPct(state, bodyFatPct) {
      console.log('commit userInfo/setBodyFatPct')
      state.bodyFatPct = bodyFatPct
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    // Converts between metric and lbs
    setWeight(state, weight) {
      console.log('commit userInfo/setWeight')
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

      state.weight = w

      store.commit('userInfo/setMass', mass)
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setNumMeals(state, numMeals) {
      console.log('commit userInfo/setNumMeals')
      state.numMeals = numMeals
      store.dispatch('calendar/setUserMetrics')
    },

    setGoal(state, goal) {
      console.log('commit userInfo/setGoal')
      state.goal = goal
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setGoalSpeed(state, goalSpeed) {
      console.log('commit userInfo/setGoalSpeed')
      state.goalSpeed = goalSpeed
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    setActivityLevel(state, activityLevel) {
      console.log('commit userInfo/setActivityLevel')
      state.activityLevel = activityLevel
      store.commit('userInfo/setTdee')
      store.dispatch('calendar/setUserMetrics')
    },

    // Calculate the TDEE using various formulas
    setTdee(state) {
      console.log('commit userInfo/setTdee')
      const bodyFatPct = state.bodyFatPct
      const mass = state.mass
      const height = state.height
      const goalSpeed = store.state.userInfo.goalSpeed

      let leanBodyMass
      let deficit

      switch (store.state.userInfo.goal) {
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
      } else if (state.gender === 'male') {
        // Boer formula (1984)
        leanBodyMass = (0.407 * mass) + (0.267 * height) - 19.2
      } else {
        // Boer formula (1984)
        leanBodyMass = (0.252 * mass) + (0.473 * height) - 48.3
      }

      // Katch McArdle formula
      const basalMetabolicRate = 370 + (21.6 * leanBodyMass)

      // Multiply by activity level to get TDEE
      const tdee = basalMetabolicRate * store.state.userInfo.activityLevel + deficit

      state.tdee = tdee
    },
  },
}
