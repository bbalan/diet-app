import db from 'store/db'
import store from 'store'

const initialState = {
  friends: [],
}

// Set initial state
db.friends
  .toArray()
  .then((friends) => {
    store.commit('indexeddb/init', friends)
  })

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    init(state, friends) {
      state.friends = friends
    },

    addFriend(state, { id, name, age }) {
      state.friends.push({ name, age, id })
    },

    deleteFriend(state, id) {
      const idx = state.friends.findIndex(friend => friend.id === id)
      if (idx !== -1) state.friends.splice(idx, 1)
    },
  },
  actions: {
    addFriend({ commit, state }, { name, age }) {
      db.friends.add({ name, age }).then((id) => {
        commit('addFriend', { id, name, age })
      })
    },

    deleteFriend({ commit, state }, { id }) {
      db.friends.delete(id).then(() => {
        commit('deleteFriend', id)
      })
    },
  },
}
