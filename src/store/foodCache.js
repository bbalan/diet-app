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
      state.food[foodUUID] = { id, source, dataFood }
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default foodCache
