import Vue from 'vue'
import * as API from 'api'
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
    add(state, { uuid, id, source, dataFood, timesLogged }) {
      // Strip unnecessary stuff to make stringification faster
      dataFood.ds = undefined
      dataFood.ru = undefined

      switch (source) {
        case API.USDA:
          dataFood.nutrients.forEach((nutrient) => {
            nutrient.measures = undefined
            nutrient.group = undefined
          })
          break
        case 'custom':
          break
        default:
          break
      }

      const lastLoggedMass = dataFood.serving || 100

      Vue.set(state, uuid, { id, source, dataFood, timesLogged, lastLoggedMass })
      setLocalStorage(MODULE_KEY, state)
    },

    edit(state, { uuid, dataFood }) {
      const item = state[uuid]

      if (item) {
        item.dataFood = dataFood
        item.lastLoggedMass = dataFood.serving
      }
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

    // Save the last mass amount this food was logged with
    setLastLoggedMass(state, { uuid, lastLoggedMass }) {
      const cached = state[uuid]
      if (cached) cached.lastLoggedMass = lastLoggedMass
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default foodCache
