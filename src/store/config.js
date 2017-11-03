import store from 'store'
import dateFormat from 'dateformat'
import { setLocalStorage, roundTo } from 'util'

const MODULE_KEY = 'config'

// Personal info about the user
const stateDefault = {
  unitWeight: 'lbs',
  unitHeight: 'ft',
  unitFood: 'grams',
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
      console.log('commit config/setUnitHeight', unitHeight)

      if (unitHeight === state.unitHeight) return

      state.unitHeight = unitHeight

      // Round metric height unit to nearest imperial unit
      if (unitHeight === 'ft') {
        const height = store.state.userInfo.height
        const roundedHeight = Math.floor(roundTo(height, 2.54))

        store.commit('userInfo/setHeight', roundedHeight)
      }

      setLocalStorage(MODULE_KEY, state)
    },

    setUnitFoot(state, unitFood) {
      state.unitFood = unitFood
      setLocalStorage(MODULE_KEY, state)
    },

    signupComplete(state) {
      state.signupComplete = true
      state.signupDate = dateFormat(new Date(), 'yyyy-mm-dd')
      setLocalStorage(MODULE_KEY, state)
    },
  },
}
