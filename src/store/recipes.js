import Vue from 'vue'
import store from 'store'
import UUID from 'uuid'
import { RECIPE } from 'util/api'
import { setLocalStorage, computeNutrient } from 'util'

import db from 'store/db'

const MODULE_KEY = 'recipe'
const stateDefault = {
  currentRecipe: null,
  data: [],
}
const stateFromLocalStorage = JSON.parse(localStorage.getItem(MODULE_KEY))

const defaultNutrients = {
  totalMass: 0,
  // serving: 0,
  calories: 0,
  fat: 0,
  fat_saturated: 0,
  fat_trans: 0,
  carbs: 0,
  fiber: 0,
  sugar: 0,
  protein: 0,
}

const recipe = {
  namespaced: true,
  state: stateFromLocalStorage || stateDefault,
  actions: {
    init({ commit }) {
      // console.log('dispatch(recipes/init)')
      db.recipes
        .toArray()
        .then((recipes) => {
          // console.log('recipes', recipes)
          commit('init', recipes)
        })
    },
    add({ commit }) {
      const cacheUUID = UUID.v4()

      db.recipes
        .add({
          name: null,
          ingredients: [],
          cacheUUID,
          nutrients: defaultNutrients,
          enabled: false,
        })
        .then((id) => {
          commit('add', { id, cacheUUID })
          store.commit('foodCache/add', {
            id,
            uuid: cacheUUID,
            source: RECIPE,
            dataFood: { ...defaultNutrients, name: '' },
            timesLogged: 0,
          })
        })
    },
  },
  mutations: {
    init(state, recipes) {
      // console.log('commit(recipes/init)', recipes)
      Vue.set(state, 'data', recipes)
    },

    add(state, { id, cacheUUID }) {
      // do nothing if this recipe already exists
      if (!state.data || state.data[id]) return

      Vue.set(state.data, id, {
        name: null,
        ingredients: [],
        cacheUUID,
        nutrients: defaultNutrients,
        enabled: false,
      })
    },

    setName(state, { uuid, name }) {
      const target = state.data[uuid]
      if (!target) return

      target.name = name

      if (name) store.commit('recipe/enable', uuid)

      store.commit('foodCache/edit', {
        uuid: target.cacheUUID,
        dataFood: { ...target.nutrients, name: target.name },
      })

      setLocalStorage(MODULE_KEY, state)
    },

    setCurrentRecipe(state, uuid) {
      state.currentRecipe = uuid
    },

    addIngredient(state, uuid) {
      store.commit('recipe/enable', state.currentRecipe)
      const target = state.data[state.currentRecipe]

      if (target) {
        target.ingredients.push(uuid)
      }

      setLocalStorage(MODULE_KEY, state)
    },

    calculateNutrients(state, recipeUUID) {
      const recipeData = state.data[recipeUUID]
      if (!recipeData) return

      const nutrients = recipeData.nutrients
      const ingredients = recipeData.ingredients
      const entries = ingredients
        .map(uuid => store.state.entries[uuid])
        .filter(entry => entry)
      const masses = entries
        .map(entry => entry.data.mass)
      const foods = entries
        .filter(entry => entry && entry.type === 'food')
        .map((entry) => {
          const food = store.state.foodCache[entry.item]
          if (!food || !entry.data) return null

          // computeNutrient() expects data in this format
          return {
            mass: entry.data.mass,
            dataFood: food.dataFood,
            source: food.source,
          }
        })

      nutrients.totalMass = masses.length ? masses.reduce((sum, val) => sum + val) : 0
      nutrients.calories = computeNutrient(foods, 'calories', '208')
      nutrients.fat = computeNutrient(foods, 'fat', '204')
      nutrients.fat_trans = computeNutrient(foods, 'fat_trans', '605')
      nutrients.fat_saturated = computeNutrient(foods, 'fat_saturated', '606')
      nutrients.carbs = computeNutrient(foods, 'carbs', '205')
      nutrients.fiber = computeNutrient(foods, 'fiber', '291')
      nutrients.sugar = computeNutrient(foods, 'sugar', '269')
      nutrients.protein = computeNutrient(foods, 'protein', '203')

      store.commit('foodCache/edit', {
        uuid: state.data[recipeUUID].cacheUUID,
        dataFood: nutrients,
      })
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
