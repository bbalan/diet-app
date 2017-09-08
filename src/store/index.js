import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from 'store/userInfo'
import config from 'store/config'
import foodCache from 'store/foodCache'
import workouts from 'store/workouts'
import entries from 'store/entries'
import calendar from 'store/calendar'
import recipe from 'store/recipe'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    userInfo,
    config,
    foodCache,
    workouts,
    entries,
    calendar,
    recipe,
  },
})

store.dispatch('entries/init')
store.dispatch('recipes/init')
store.dispatch('workouts/init')

export default store
