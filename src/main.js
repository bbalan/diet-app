/* eslint-disable */
import Vue from 'vue'
import router from 'router'
import App from 'components/App'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import routes from 'router/routes'

// F7 iOS
// import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'

// F7 Material Design
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Firebase stuff
// import Firebase from 'firebase'
// import VueFire from 'vuefire'
// import firebaseDB from './util/Firebase'

// Vue.use(VueFire)

Vue.use(Framework7Vue)

const app = new Vue({
  el: '#app',
  router,
  ...App,
  framework7: {
    root: '#app',
    // routes,
  }
})
