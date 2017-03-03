import Vue from 'vue'
import store from 'store'
import { setLocalStorage } from './util'

const MODULE_KEY = 'recipe'
const stateDefault = {}
const stateFromLocalStorage = JSON.parse(localStorage.getItem(MODULE_KEY))

const recipe = {
  namespaced: true,
  state: stateFromLocalStorage || stateDefault,
  mutations: {
    add(state, uuid) {
      if (state[uuid]) return // do nothing if this recipe already exists

      Vue.set(state, uuid, {
        name: null,
        ingredients: null,
        nutrients: {
          serving: null,
          calories: null,
          fat: null,
          fat_saturated: null,
          fat_trans: null,
          carbs: null,
          fiber: null,
          sugar: null,
          protein: null,
        },
        enabled: false,
      })
      setLocalStorage(MODULE_KEY, state)
    },

    setName(state, { uuid, name }) {
      if (state[uuid]) state[uuid].name = name

      store.commit('recipe/enable', uuid)
      store.commit('recipe/deleteAllDisabled')

      setLocalStorage(MODULE_KEY, state)
    },

    addIngredient(state, { uuid, ingredient_uuid }) {
      console.log(uuid, ingredient_uuid)
    },

    deleteIngredient(state, { uuid, ingredient_uuid }) {
      console.log(uuid, ingredient_uuid)
    },

    disable(state, uuid) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    enable(state, uuid) {
      state[uuid].enabled = true
      setLocalStorage(MODULE_KEY, state)
    },

    deleteAllDisabled(state) {
      Object.entries(state).forEach((entry) => {
        const uuid = entry[0]
        if (!entry[1].enabled) {
          delete state[uuid]
        }
      })
    },
  },
}

export default recipe
