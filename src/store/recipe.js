import Vue from 'vue'
import store from 'store'
import { setLocalStorage } from './util'

const MODULE_KEY = 'recipe'
const stateDefault = {
  currentRecipe: null,
  data: {},
}
const stateFromLocalStorage = JSON.parse(localStorage.getItem(MODULE_KEY))

const recipe = {
  namespaced: true,
  state: stateFromLocalStorage || stateDefault,
  mutations: {
    add(state, uuid) {
      // do nothing if this recipe already exists
      if (!state.data || state.data[uuid]) return

      Vue.set(state.data, uuid, {
        name: null,
        ingredients: [],
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
      if (state.data[uuid]) state.data[uuid].name = name

      store.commit('recipe/enable', uuid)
      store.commit('recipe/deleteAllDisabled')

      setLocalStorage(MODULE_KEY, state)
    },

    setCurrentRecipe(state, uuid) {
      state.currentRecipe = uuid
    },

    addIngredient(state, uuid) {
      const target = state.data[state.currentRecipe]
      if (target) target.ingredients.push(uuid)
      setLocalStorage(MODULE_KEY, state)
    },

    deleteIngredient(state, uuid) {
      // TODO: implement this
      console.log(uuid, state.currentRecipe)
    },

    disable(state, uuid) {
      state.data[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    enable(state, uuid) {
      state.data[uuid].enabled = true
      setLocalStorage(MODULE_KEY, state)
    },

    deleteAllDisabled(state) {
      Object.entries(state.data).forEach((entry) => {
        const uuid = entry[0]
        if (!entry[1].enabled) {
          delete state.data[uuid]
        }
      })
    },
  },
}

export default recipe
