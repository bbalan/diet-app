import store from '.'
import { setLocalStorage } from './utils'

const MODULE_KEY = 'log'

// Personal info about the user
const stateDefault = {
  days: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    // ...
  },
}
