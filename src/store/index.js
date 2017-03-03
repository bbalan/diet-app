import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from 'store/userInfo'
import config from 'store/config'
import foodCache from 'store/foodCache'
import workout from 'store/workout'
import entries from 'store/entries'
import calendar from 'store/calendar'
import search from 'store/search'
import recipe from 'store/recipe'

Vue.use(Vuex)

// TODO: replace localStorage with IndexedDB
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    config,
    foodCache,
    workout,
    entries,
    calendar,
    search,
    recipe,
  },
})

export default store
