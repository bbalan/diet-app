import Vue from 'vue'
import Vuex from 'vuex'

import appStatus from 'store/appStatus'
import userInfo from 'store/userInfo'
import config from 'store/config'
import foodCache from 'store/foodCache'
import workoutPresets from 'store/workoutPresets'
import entries from 'store/entries'
import calendar from 'store/calendar'
import search from 'store/search'

Vue.use(Vuex)

// TODO: replace localStorage with IndexedDB
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    config,
    foodCache,
    workoutPresets,
    entries,
    calendar,
    search,
    appStatus,
  },
})

export default store
