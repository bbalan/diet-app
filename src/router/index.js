import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import Routes from './Routes'
import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import FoodSearch from '../components/FoodSearch'
import Food from '../components/Food'
import FoodCache from '../components/Food/FoodCache'
import FoodLog from '../components/FoodLog'

// Routes
const routes = [
  { path: Routes.Root, component: Splash },
  { path: Routes.Signup, component: SignupForm },
  { path: Routes.FoodSearch, component: FoodSearch },
  { path: Routes.Food, component: Food, props: true },
  { path: Routes.FoodCache, component: FoodCache },
  { path: Routes.FoodLog, component: FoodLog },
]

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.use(VueRouter);

sync(store, router)

export default router
