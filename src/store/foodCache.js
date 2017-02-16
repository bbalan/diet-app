import Vue from 'vue'
import { setLocalStorage } from './util'

const MODULE_KEY = 'foodCache'

// Personal info about the user
const stateDefault = {}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const foodCache = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addFood(state, { uuid, id, source, dataFood }) {
      // Strip unnecessary stuff to make stringification faster
      dataFood.ds = undefined
      dataFood.ru = undefined
      dataFood.nutrients.forEach((nutrient) => {
        nutrient.measures = undefined
        nutrient.group = undefined
      })

      Vue.set(state, uuid, { id, source, dataFood })
      setLocalStorage(MODULE_KEY, state)
    },

    // Track how many times a cached food item has been eaten
    increment(state, uuid) {
      const food = state[uuid]

      if (food) {
        if (food.timesLogged) {
          food.timesLogged += 1
        } else {
          food.timesLogged = 1
        }
      }

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default foodCache
