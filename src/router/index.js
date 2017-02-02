import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '../store'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import FoodSearch from '../components/FoodSearch'
import FoodItem from '../components/FoodItem'
import Ingredients from '../components/Ingredients'

// Routes
const routes = [
  { path: '/', component: Splash },
  { path: '/signup', component: SignupForm },
  { path: '/foodSearch', component: FoodSearch },
  { path: '/ingredient/:source/:id', component: FoodItem, props: true },
  { path: '/ingredients', component: Ingredients },
]

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.use(VueRouter);

sync(store, router)

export default router
