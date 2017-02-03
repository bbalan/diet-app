import Vue from 'vue'
import App from './components/App'
import router from './router'

// Firebase stuff
/* eslint-disable no-unused-vars */
// import Firebase from 'firebase'
// import VueFire from 'vuefire'
// import firebaseDB from './util/Firebase'

// Vue.use(VueFire)

const app = new Vue({
  el: '#app',
  router,
  ...App,
})
