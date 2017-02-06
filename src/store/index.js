import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from 'store/userInfo'
import appSettings from 'store/appSettings'
import foodCache from 'store/foodCache'
import entries from 'store/entries'
import days from 'store/days'

Vue.use(Vuex)

// TODO: replace localStorage with IndexedDB
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    appSettings,
    foodCache,
    entries,
    days,
  },
})

export default store
