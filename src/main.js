import Vue from 'vue'
import router from 'router'
import App from 'components/App'

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
