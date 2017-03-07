import Vue from 'vue'
import store from 'store'
import { computeNutrient } from 'util'
import { setLocalStorage } from 'store/util'

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
        },
        enabled: false,
      })

      setLocalStorage(MODULE_KEY, state)
    },

    setName(state, { uuid, name }) {
      if (state.data[uuid]) state.data[uuid].name = name
      if (name) store.commit('recipe/enable', uuid)

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

    calculateNutrients(state) {
      const recipeData = state.data[state.currentRecipe]
      if (!recipeData) return

      const nutrients = recipeData.nutrients
      const ingredients = recipeData.ingredients
      const entries = ingredients
        .map(uuid => store.state.entry[uuid])
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

      nutrients.totalMass = masses.reduce((sum, val) => sum + val)
      nutrients.calories = computeNutrient(foods, 'calories', '208')
      nutrients.fat = computeNutrient(foods, 'fat', '204')
      nutrients.fat_trans = computeNutrient(foods, 'fat_trans', '605')
      nutrients.fat_saturated = computeNutrient(foods, 'fat_saturated', '606')
      nutrients.carbs = computeNutrient(foods, 'carbs', '205')
      nutrients.fiber = computeNutrient(foods, 'fiber', '291')
      nutrients.sugar = computeNutrient(foods, 'sugar', '269')
      nutrients.protein = computeNutrient(foods, 'protein', '203')
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
