import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'router/routes'
import { sync } from 'vuex-router-sync'
import store from 'store'

Vue.use(VueRouter)

const appName = 'App' // the name of this app (appears in tab title)

const router = new VueRouter({
  mode: 'history',
  routes,
})

// Set tab title after each route change
router.afterEach((route) => {
  const title = route.meta.title
  // document.title = title ? `${appName} | ${title}` : appName
  document.title = title || appName

  // If 404, redirect to Log or Welcome page
  if (route.matched.length === 0) {
    if (store.state.config.signupComplete) {
      router.replace({ name: 'log' })
    } else {
      router.replace('/welcome#intro')
    }
  }
})

sync(store, router)

export default router
