import store from '.'
import { setLocalStorage } from './utils'

const MODULE_KEY = 'log'

// Personal info about the user
const stateDefault = {
  days: [],
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const ingredients = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addIngredient(state, ingredient) {
      state.ingredients.push(ingredient)
      setLocalStorage(MODULE_KEY, state)
    }
  },
}

export default ingredients
