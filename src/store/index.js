import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './userInfo'
import appSettings from './appSettings'
import ingredientCache from './ingredientCache'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    ingredientCache,
  },
})

export default store
