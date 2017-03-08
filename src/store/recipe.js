import Vue from 'vue'
import store from 'store'
import UUID from 'uuid'
import { RECIPE } from 'util/api'
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

      const cacheUUID = UUID.v4()

      const nutrients = {
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

      Vue.set(state.data, uuid, {
        name: null,
        ingredients: [],
        cacheUUID,
        nutrients,
        enabled: false,
      })

      store.commit('foodCache/add', {
        uuid: cacheUUID,
        id: uuid,
        source: RECIPE,
        dataFood: { ...nutrients, name: '' },
        timesLogged: 0,
      })

      setLocalStorage(MODULE_KEY, state)
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
