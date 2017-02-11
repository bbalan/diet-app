import store from 'store'
import dateFormat from 'dateformat'
import { roundTo } from 'util'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'appSettings'

// Personal info about the user
const stateDefault = {
  unitWeight: 'lbs',
  unitHeight: 'ft',
  numMeals: 3, // TODO: expose this to user
  mealStops: [],
  goal: null,
  goalSpeed: 350,
  activityLevel: 1.21,
  signupComplete: false,
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    setUnitWeight(state, unitWeight) {
      state.unitWeight = unitWeight
      setLocalStorage(MODULE_KEY, state)
    },
    setUnitHeight(state, unitHeight) {
      state.unitHeight = unitHeight

      // Round metric height unit to nearest imperial unit
      if (unitHeight === 'ft') {
        const height = store.state.userInfo.metrics.height
        const roundedHeight = Math.floor(roundTo(height, 2.54))

        store.commit('userInfo/setHeight', roundedHeight)
      }

      setLocalStorage(MODULE_KEY, state)
    },
    setNumMeals(state, numMeals) {
      state.numMeals = numMeals
      setLocalStorage(MODULE_KEY, state)
    },
    setGoal(state, goal) {
      state.goal = goal
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    setActivityLevel(state, activityLevel) {
      state.activityLevel = activityLevel
      store.commit('userInfo/calcTDEE')
      setLocalStorage(MODULE_KEY, state)
    },
    signupComplete(state) {
      state.signupComplete = true
      state.signupDate = dateFormat(new Date(), 'mm-dd-yy')
      setLocalStorage(MODULE_KEY, state)
    },
  },
}
