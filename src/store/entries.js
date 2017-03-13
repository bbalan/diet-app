import store from 'store'
import db from 'store/db'

// Set initial state
db.entries
  .toArray()
  .then((entries) => {
    store.commit('entries/init', entries)
  })

const entries = {
  namespaced: true,
  state: { data: [] },
  actions: {
    add({ commit }, { item, type, data, isForRecipe }) {
      db.entries
        .add({ item, type, data, enabled: true, checked: false })
        .then((id) => {
          commit('add', { id, item, type, data })

          // TODO: change to dispatch
          if (isForRecipe) {
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
      let e = state.data.find(entry => entry.id === id)

      if (e) {
        const date = e.date
        e = undefined

        // TODO: replace with dispatch
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

export default entries
