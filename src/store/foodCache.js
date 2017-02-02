import { setLocalStorage } from './util'

const MODULE_KEY = 'foodCache'

function findFood(id) {
  return function find(el) {
    return id === el.id
  }
}

// Personal info about the user
const stateDefault = {
  food: [],
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const foodCache = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addFood(state, { id, source, dataFood }) {
      const finder = findFood(id)

      // Food is not already in the list
      if (!state.food.find(finder)) {
        state.food.push({ id, source, dataFood })
      } else {
        console.warn(`Food ${id} already in state`)
      }

      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default foodCache
