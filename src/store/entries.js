import Vue from 'vue'
import store from 'store'
import UUID from 'uuid'
import { setLocalStorage } from './util'

const MODULE_KEY = 'entries'
const stateDefault = {}
const stateLocalStorage = JSON.parse(localStorage.getItem(MODULE_KEY))

const entries = {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    add(state, { item, type, data, isForRecipe }) {
      const uuid = UUID.v4()

      Vue.set(state, uuid, {
        item,
        type,
        data,
        enabled: true,
        checked: false,
      })

      if (isForRecipe) {
        store.commit('recipe/addIngredient', uuid)
      } else {
        store.commit('calendar/entryAdd', { uuid, date: store.state.calendar.currentDay })
      }

      setLocalStorage(MODULE_KEY, state)
    },

    edit(state, { uuid, data }) {
      if (!state[uuid]) return
      state[uuid].data = data
      setLocalStorage(MODULE_KEY, state)
    },

    // TODO: disable entry instead of deleting
    // TODO: snackbar with undo button
    delete(state, { uuid }) {
      if (state[uuid]) {
        const date = state[uuid].date
        state[uuid] = undefined

        store.commit('calendar/entryDelete', { uuid, date })
        setLocalStorage(MODULE_KEY, state)
      }
    },

    // TODO: make this affect tdee in Day & Dashboard components
    disable(state, { uuid }) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    // TODO: make this affect tdee in Day & Dashboard components
    enable(state, { uuid }) {
      state[uuid].enabled = false
      setLocalStorage(MODULE_KEY, state)
    },

    setMass(state, { uuid, mass }) {
      state[uuid].data.mass = mass
      setLocalStorage(MODULE_KEY, state)
    },
  },
}

export default entries
