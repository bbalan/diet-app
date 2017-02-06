import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from 'router/routes'
import store from 'store'

import Splash from 'components/Splash'
import Settings from 'components/Settings'
import Search from 'components/Search'
import Food from 'components/Food'
import Log from 'components/Log'

import Cache from 'components/Dev/FoodCache'
import Entries from 'components/Dev/Entries'
import LocalStorage from 'components/Dev/LocalStorage'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: routes.Root, component: Splash },
    { path: routes.Settings, component: Settings },
    { path: routes.Search, component: Search },
    { path: routes.Food, component: Food, props: true },
    { path: routes.Entry, component: Food, props: true },
    { path: routes.Log, component: Log, canReuse: false },

    { path: routes.Cache, component: Cache },
    { path: routes.Entries, component: Entries },
    { path: routes.LocalStorage, component: LocalStorage },
  ],
})

Vue.use(VueRouter);

sync(store, router)

export default router
