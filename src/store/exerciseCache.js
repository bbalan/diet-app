import Vue from 'vue'
import store from 'store'
import dateFormat from 'dateformat'
import { setLocalStorage } from 'store/util'

const MODULE_KEY = 'exerciseCache'

// Personal info about the user
const stateDefault = {
  data: {},
}

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
)

const log = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    addExercise(state, { uuid, exerciseData }) {
      Vue.set(state.data, uuid, exerciseData)
      setLocalStorage(MODULE_KEY, state)
    },
    editExercise(state, exerciseData) {
      state.data[uuid] = exerciseData
      setLocalStorage(MODULE_KEY, state)
    },
    deleteExercise(state, uuid) {
      state.data[uuid] = undefined
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default log
