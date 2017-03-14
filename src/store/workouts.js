import store from 'store'
import db from 'store/db'

export default {
  namespaced: true,
  state: { data: [] },
  actions: {
    init({ commit }) {
      db.workouts
        .toArray()
        .then((workouts) => { commit('init', workouts) })
    },

    add({ commit }, { name, calories, addEntry }) {
      db.workouts
        .add({ name, calories })
        .then((id) => {
          commit('add', { id, name, calories })

          if (addEntry) {
            store.dispatch('entries/add', {
              item: id,
              type: 'workout',
              data: { name, calories },
            })
          }
        })
    },

    edit({ commit }, { id, name, calories }) {
      db.workouts
        .update(id, { name, calories })
        .then(() => { commit('edit', { id, name, calories }) })
    },

    delete({ commit }, id) {
      db.workouts
        .delete(id)
        .then(() => { commit('delete', id) })
    },
  },
  mutations: {
    init(state, fromIndexedDB) {
      state.data = fromIndexedDB
    },

    add(state, { id, name, calories }) {
      state.data.push({ id, name, calories })
    },

    edit(state, { id, name, calories }) {
      const w = state.data.find(workout => workout.id === id)
      if (w) {
        w.name = name
        w.calories = calories
      }
    },

    delete(state, id) {
      const idx = state.data.findIndex(workout => workout.id === id)
      if (idx !== -1) state.data.splice(idx, 1)
    },
  },
}
