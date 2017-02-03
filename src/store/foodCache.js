import { setLocalStorage } from './util'

const MODULE_KEY = 'foodCache'

// Personal info about the user
const stateDefault = {
  food: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const foodCache = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addFood(state, { foodUUID, id, source, dataFood }) {
      // Strip unnecessary stuff to make stringification faster
      dataFood.ds = undefined
      dataFood.ru = undefined
      dataFood.nutrients.forEach((nutrient) => {
        nutrient.measures = undefined
        nutrient.group = undefined
      })

      state.food[foodUUID] = { id, source, dataFood }
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default foodCache
