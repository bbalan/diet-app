import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
// import { sync } from 'vuex-router-sync'
// import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import FoodSearch from '../components/FoodSearch'
import Food from '../components/Food'
import FoodCache from '../components/Food/FoodCache'
import DailyLog from '../components/DailyLog'

// Routes
const routes = [
  { path: Routes.root, component: Splash },
  { path: Routes.signup, component: SignupForm },
  { path: Routes.foodSearch, component: FoodSearch },
  { path: Routes.food, component: Food, props: true },
  { path: Routes.foodCache, component: FoodCache },
  { path: Routes.dailyLog, component: DailyLog },
]

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.use(VueRouter);

// sync(store, router)

export default router
