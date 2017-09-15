import store from 'store'
import db from 'store/db'

export default {
  namespaced: true,
  state: { data: [] },
  actions: {
    init({ commit }) {
      console.log('dispatch(entries/init)')
      db.entries
        .toArray()
        .then((entries) => {
          console.log('entries', entries)
          commit('init', entries)
        })
    },
    add({ commit }, { item, type, data, isForRecipe }) {
      db.entries
        .add({ item, type, data, enabled: true, checked: false })
        .then((id) => {
          commit('add', { id, item, type, data })

          // TODO: change to dispatch
          if (isForRecipe) {
            // this entry represents an ingredient in a recipe, not food eaten on a particular day
            store.commit('recipe/addIngredient', id)
          } else {
            store.commit('calendar/entryAdd', id)
          }
        })
    },
    edit({ commit }, { id, data }) {
      db.entries
        .update(id, data)
        .then(() => { commit('edit', { id, data }) })
    },
    delete({ commit }, id) {
      db.entries
        .delete(id)
        .then(() => { commit('delete', id) })
    },
    enable({ commit }, id) {
      db.entries
        .update(id, { enabled: true })
        .then(() => { commit('enable', id) })
    },
    disable({ commit }, id) {
      db.entries
        .update(id, { enabled: false })
        .then(() => { commit('disable', id) })
    },
    setMass({ commit }, { id, mass }) {
      db.entries
        .update(id, { data: { mass } })
        .then(() => { commit('setMass', { id, mass }) })
    },
    clear({ commit }) {
      db.entries
        .clear()
        .then(() => { commit('clear') })
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      console.log('commit(entries/init)')
      state.data = fromIndexedDB
    },

    add(state, { id, item, type, data }) {
      state.data.push({ id, item, type, data, enabled: true, checked: false })
    },

    edit(state, { id, data }) {
      const e = state.data.find(entry => entry.id === id)
      if (e) e.data = data
    },

    // TODO: disable entry instead of deleting
    // TODO: snackbar with undo button
    delete(state, id) {
      const idx = state.data.findIndex(entry => entry.id === id)

      if (idx !== -1) {
        const date = state.data[idx].date
        state.data.splice(idx, 1)
        store.commit('calendar/entryDelete', { uuid: id, date })
      }
    },

    // TODO: make this affect tdee in Day & Dashboard components
    disable(state, id) {
      const e = state.data.find(entry => entry.id === id)
      if (e) e.enabled = false
    },

    // TODO: make this affect tdee in Day & Dashboard components
    enable(state, id) {
      const e = state.data.find(entry => entry.id === id)
      if (e) e.enabled = true
    },

    setMass(state, { id, mass }) {
      const e = state.data.find(entry => entry.id === id)
      if (e) e.data.mass = mass
    },

    clear(state) {
      state.data = []
    },
  },
}
