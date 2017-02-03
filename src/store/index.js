import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

import userInfo from './userInfo'
import appSettings from './appSettings'
import foodCache from './foodCache'
import log from './log'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    foodCache,
    log,
  },
  mutations: {
    eatFood(state, data) {
      store.commit('foodCache/addFood', data)

      const entryID = uuid.v4()
      store.commit('log/addEntry', { entryID, data })
    },
  },
})

export default store
