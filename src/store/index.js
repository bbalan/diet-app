import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './userInfo'
import appSettings from './appSettings'
import ingredientHistory from './ingredientHistory'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    ingredientHistory,
  },
})

export default store
