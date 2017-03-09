import db from 'store/db'
import store from 'store'

const stateDefault = {
  friends: [],
}

const stateIndexedDB = {
  friends: [],
}

db.friends.toArray().then((friends) => {
  store.commit('indexeddb/setFriends', friends)
})

export default {
  namespaced: true,
  state: stateIndexedDB || stateDefault,
  actions: {
    addFriend({ commit, state }, { name, age }) {
      db.friends
        .add({ name, age })
        .then((id) => {
          commit('addFriend', { id, name, age })
        })
    },
  },
  mutations: {
    setFriends(state, friends) {
      state.friends = friends
    },
    addFriend(state, { id, name, age }) {
      state.friends.push({ name, age, id })
    },
  },
}
