import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from 'store/userInfo'
import config from 'store/config'
import foodCache from 'store/foodCache'
import workouts from 'store/workouts'
import entries from 'store/entries'
import calendar from 'store/calendar'
import search from 'store/search'
import recipe from 'store/recipe'

import indexeddb from 'store/indexeddb'

Vue.use(Vuex)

// TODO: replace localStorage with IndexedDB
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    config,
    foodCache,
    workouts,
    entries,
    calendar,
    search,
    recipe,
    indexeddb,
  },
})

store.dispatch('workouts/init')

export default store
