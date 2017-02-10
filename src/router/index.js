import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import paths from 'router/paths'
import store from 'store'

// import Splash from 'components/Splash'
import Welcome from 'components/Welcome'
import Log from 'components/Log'

import Entry from 'components/Entry'
import WeighIn from 'components/Entry/WeighIn'

import FoodFind from 'components/FoodFind'
import FoodSearch from 'components/FoodFind/Search'
import FoodFavorites from 'components/FoodFind/Favorites'
import FoodCustom from 'components/FoodFind/Custom'
import FoodRecipes from 'components/FoodFind/Recipes'

import WorkoutFind from 'components/WorkoutFind'
import WorkoutCached from 'components/WorkoutFind/WorkoutCached'


import Cache from 'components/Dev/FoodCache'
import Entries from 'components/Dev/Entries'
import LocalStorage from 'components/Dev/LocalStorage'

const router = new VueRouter({
  mode: 'history',
  routes: [
    // { path: paths.Root, component: Splash },
    { path: paths.Root, component: Log },
    { path: paths.Welcome, component: Welcome },
    { path: paths.Log, component: Log, canReuse: false },
    { path: paths.Entry, component: Entry, props: true },
    { path: paths.EntryFood, component: Entry, props: true },
    { path: paths.WeighIn, component: WeighIn },
    { path: paths.WorkoutCached, component: WorkoutCached, props: true },
    {
      path: paths.FoodFind,
      redirect: paths.FoodSearch,
      component: FoodFind,
      children: [
        {
          path: 'search',
          component: FoodSearch,
        },
        {
          path: 'favorites',
          component: FoodFavorites,
        },
        {
          path: 'custom',
          component: FoodCustom,
        },
        {
          path: 'recipes',
          component: FoodRecipes,
        },
      ],
    },
    {
      path: paths.WorkoutFind,
      component: WorkoutFind,
    },

    { path: paths.Cache, component: Cache },
    { path: paths.Entries, component: Entries },
    { path: paths.LocalStorage, component: LocalStorage },
  ],
})

Vue.use(VueRouter);

sync(store, router)

export default router
