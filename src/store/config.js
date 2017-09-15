import store from 'store'
import db from 'db'
import { roundTo } from 'util'

export default {
  namespaced: true,
  state: {
    unitWeight: 'lbs',
    unitHeight: 'ft',
    unitFood: 'grams',
    signupComplete: false,
    signupDate: null,
  },
  actions: {
    init({ commit }) {
      db.config
        .toArray()
        .then((config) => {
          commit('config/init', config)
        })
    },
    setUnitWeight({ commit }, unitWeight) {
      db.config
        .put('unitWeight', unitWeight)
        .then(() => {
          commit('config/setUnitWeight', unitWeight)
        })
    },
    setUnitHeight({ commit }, unitHeight) {
      db.config
        .put('unitHeight', unitHeight)
        .then(() => {
          commit('config/setUnitHeight', unitHeight)
        })
    },
    setUnitFood({ commit }, unitFood) {
      db.config
        .put('unitFood', unitFood)
        .then(() => {
          commit('config/setUnitFood', unitFood)
        })
    },
    setSignput({ commit }, signupDate) {
      db.config
        .put('signupDate', signupDate)
        .then(() => {
          commit('config/setSignupDate', signupDate)
        })
    },
    setSignupComplete({ commit }, signupComplete) {
      db.config
        .put('signupComplete', signupComplete)
        .then(() => {
          commit('config/setSignupComplete', signupComplete)
        })
    },
  },
  mutations: {
    init(state, config) {
      // @TODO: init in-memory store
      console.log('config.init()', config)
    },
    setUnitWeight(state, unitWeight) {
      state.unitWeight = unitWeight
    },

    setUnitHeight(state, unitHeight) {
      state.unitHeight = unitHeight

      // Round metric height unit to nearest imperial unit
      if (unitHeight === 'ft') {
        const height = store.state.userInfo.metrics.height
        const roundedHeight = Math.floor(roundTo(height, 2.54))

        store.dispatch('userInfo/setHeight', roundedHeight)
      }
    },

    setUnitFood(state, unitFood) {
      state.unitFood = unitFood
    },

    setSignupComplete(state) {
      state.signupComplete = true
      store.dispatch('config/setSignupDate', new Date())
    },

    setSignput(state, date) {
      state.signupDate = date
    },
  },
}
