import { setLocalStorage } from './util'

const MODULE_KEY = 'ingredientHistory'

function findIngredient(id) {
  return function find(el) {
    return id === el.id
  }
}

// Personal info about the user
const stateDefault = {
  ingredients: [],
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const ingredientHistory = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addIngredient(state, { id, source, dataFood }) {
      const finder = findIngredient(id)

      // Ingredient is not already in the list
      if (!state.ingredients.find(finder)) {
        state.ingredients.push({ id, source, dataFood })
      } else {
        console.warn(`Ingredient ${id} already in state`)
      }

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default ingredientHistory
