import Vue from 'vue'
import db from 'store/db'
import { USDA, CUSTOM } from 'util/api'

// TODO: split this into cache/food and create cache/search, etc

// A cache storing USDA search entries
const foodCache = {
  namespaced: true,
  state: {},
  actions: {
    init({ commit }) {
      db.foodCache
        .toArray()
        .then((food) => {
          commit('foodCache/init', food)
        })
    },
    add({ commit }, { uuid, source, dataFood, timesLogged }) {
      // Strip unnecessary stuff to make stringification faster
      dataFood.ds = undefined
      dataFood.ru = undefined

      switch (source) {
        case USDA:
          dataFood.nutrients.forEach((nutrient) => {
            nutrient.measures = undefined
            nutrient.group = undefined
          })
          break
        case CUSTOM: // do nothing (?)
          break
        default:
          break
      }

      const lastLoggedMass = dataFood.serving || 100

      db.foodCache
        .update({ uuid, source, dataFood, timesLogged })
        .then(() => commit('foodCache/add', { uuid, source, dataFood, timesLogged, lastLoggedMass }))
    },
    edit({ commit }, { uuid, dataFood }) {
      db.foodCache
        .update(uuid, dataFood)
        .then(() => {
          commit('foodCache/edit', { uuid, dataFood })
        })
    },
  },
  mutations: {
    add(state, { uuid, source, dataFood, timesLogged, lastLoggedMass }) {
      Vue.set(state, uuid, { source, dataFood, timesLogged, lastLoggedMass })
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
    },

    // Save the last mass amount this food was logged with
    setLastLoggedMass(state, { uuid, lastLoggedMass }) {
      const cached = state[uuid]
      if (cached) cached.lastLoggedMass = lastLoggedMass
    },
  },
}

export default foodCache
