import store from '.'
import { setLocalStorage, roundTo } from './util'

const MODULE_KEY = 'appSettings'

// Personal info about the user
const stateDefault = {
  unitWeight: 'imperial',
  unitHeight: 'imperial',
  numMeals: null,
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
      if (unitHeight === 'imperial') {
        const height = store.state.userInfo.height
        const roundedHeight = Math.floor(roundTo(height, 2.54))

        store.commit('userInfo/setHeight', roundedHeight)
      }

      setLocalStorage(MODULE_KEY, state)
    },
    setNumMeals(state, numMeals) {
      state.numMeals = numMeals
      setLocalStorage(MODULE_KEY, state)
    },
  },
}
