import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '../store'

// import Foo from '../components/Foo/Foo'
// import Bar from '../components/Foo/Bar'

import Splash from '../components/Splash'
import SignupForm from '../components/SignupForm'
import SampleData from '../components/SampleData'

// Routes
const routes = [
  { path: '/', component: Splash, },
  { path: '/signup', component: SignupForm, },
  { path: '/sampleData', component: SampleData, },
]

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.use(VueRouter);

sync(store, router)

export default router
