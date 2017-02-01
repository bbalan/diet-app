import store from '.'
import { setLocalStorage } from './util'

const MODULE_KEY = 'userInfo'

// Personal info about the user
const stateDefault = {
  birthday: null,
  birthdayTimestamp: null,
  age: null,
  gender: null,
  height: 177,
  weight: null,
  mass: null,
  goal: null,
  goalSpeed: null,
  activityLevel: 1,
  signupComplete: false,
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    /** Translates the user's birthday into a timestamp, and calculates their age. */
    setBirthday(state, birthday) {
      const today = new Date().getTime()
      const birthdayTimestamp = new Date(birthday).getTime()
      const secondsInAYear = 365 * 24 * 60 * 60
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10

      state.birthday = birthday
      state.birthdayTimestamp = birthdayTimestamp
      state.age = age

      setLocalStorage(MODULE_KEY, state)
    },
    setGender(state, gender) {
      state.gender = gender
      setLocalStorage(MODULE_KEY, state)
    },
    setHeight(state, height) {
      state.height = height
      setLocalStorage(MODULE_KEY, state)
    },
    setMass(state, mass) {
      state.mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
    // Converts between metric and imperial
    setWeight(state, weight) {
      let w
      let mass

      if (typeof weight !== 'number') {
        w = null
        mass = null
      } else {
        w = weight

        const unitWeight = store.state.appSettings.unitWeight

        if (unitWeight === 'metric') {
          mass = weight
        } else {
          mass = weight / 2.20462
        }
      }

      state.weight = w

      store.commit('userInfo/setMass', mass);

      setLocalStorage(MODULE_KEY, state)
    },
    setGoal(state, goal) {
      state.goal = goal
      setLocalStorage(MODULE_KEY, state)
    },
    setActivityLevel(state, activityLevel) {
      state.activityLevel = activityLevel
      setLocalStorage(MODULE_KEY, state)
    },
    signupComplete(state) {
      state.signupComplete = true
      setLocalStorage(MODULE_KEY, state)
    },
  },
}
