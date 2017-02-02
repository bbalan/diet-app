import { setLocalStorage } from './util'

const MODULE_KEY = 'ingredients'

function findIngredient(id) {
  return function find(el) {
    return id === el.id
  }
}

// Personal info about the user
const stateDefault = {
  history: [],
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const ingredients = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addIngredient(state, { id, source, dataFood }) {
      const finder = findIngredient(id)

      // Ingredient is not already in the list
      if (!state.history.find(finder)) {
        state.history.push({ id, source, dataFood })
      } else {
        console.warn('Already added', state.history.find(finder))
      }

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default ingredients
