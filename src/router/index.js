import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import Routes from './Routes'
import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import Search from '../components/Search'
import Food from '../components/Food'
import Log from '../components/Log'

import Cache from '../components/Food/Cache'
import EntryList from '../components/Log/EntryList'

// Routes
const routes = [
  { path: Routes.Root, component: Splash },
  { path: Routes.Signup, component: SignupForm },
  { path: Routes.Search, component: Search },
  { path: Routes.Food, component: Food, props: true },
  { path: Routes.Entry, component: Food, props: true },
  { path: Routes.Log, component: Log },

  { path: Routes.Cache, component: Cache },
  { path: Routes.EntryList, component: EntryList },
]

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.use(VueRouter);

sync(store, router)

export default router
