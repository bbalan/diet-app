import Vue from 'vue'
import Vuex from 'vuex'

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
})

export default store
