import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
// import { sync } from 'vuex-router-sync'
// import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import FoodSearch from '../components/FoodSearch'
import Ingredient from '../components/Ingredient'
import ingredientCache from '../components/Ingredient/IngredientCache'
import DailyLog from '../components/DailyLog'

// Routes
const routes = [
  { path: Routes.root, component: Splash },
  { path: Routes.signup, component: SignupForm },
  { path: Routes.foodSearch, component: FoodSearch },
  { path: Routes.ingredient, component: Ingredient, props: true },
  { path: Routes.ingredientCache, component: ingredientCache },
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
