import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from 'router/routes'
import store from 'store'

// import Splash from 'components/Splash'
import Settings from 'components/Settings'
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
    // { path: routes.Root, component: Splash },
    { path: routes.Root, component: Log },
    { path: routes.Settings, component: Settings },
    { path: routes.Log, component: Log, canReuse: false },
    { path: routes.Entry, component: Entry, props: true },
    { path: routes.EntryFood, component: Entry, props: true },
    { path: routes.WeighIn, component: WeighIn },
    { path: routes.WorkoutCached, component: WorkoutCached, props: true },
    {
      path: routes.FoodFind,
      redirect: routes.FoodSearch,
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
      path: routes.WorkoutFind,
      component: WorkoutFind,
    },

    { path: routes.Cache, component: Cache },
    { path: routes.Entries, component: Entries },
    { path: routes.LocalStorage, component: LocalStorage },
  ],
})

Vue.use(VueRouter);

sync(store, router)

export default router
