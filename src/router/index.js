import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import Search from '../components/Search'
import Food from '../components/Food'
import Log from '../components/Log'

import Cache from '../components/Food/FoodCache'
import EntryList from '../components/Log/EntryList'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: routes.Root, component: Splash },
    { path: routes.Signup, component: SignupForm },
    { path: routes.Search, component: Search },
    { path: routes.Food, component: Food, props: true },
    { path: routes.Entry, component: Food, props: true },
    { path: routes.Log, component: Log },

    { path: routes.Cache, component: Cache },
    { path: routes.EntryList, component: EntryList },
  ],
})

Vue.use(VueRouter);

sync(store, router)

export default router
