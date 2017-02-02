import { setLocalStorage } from './util'

const MODULE_KEY = 'ingredients'

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

const ingredients = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addIngredient(state, ingredient) {
      const finder = findIngredient(ingredient.id)

      if (!state.ingredients.find(finder)) {
        state.ingredients.push(ingredient)
      }

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default ingredients
