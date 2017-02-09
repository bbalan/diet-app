/* eslint-disable */
import Vue from 'vue'
import router from 'router'
import App from 'components/App'
import paths from 'router/paths'
import fonts from 'assets/fonts/index.css'
// Firebase stuff
// import Firebase from 'firebase'
// import VueFire from 'vuefire'
// import firebaseDB from './util/Firebase'

// Vue.use(VueFire)


const app = new Vue({
  el: '#app',
  router,
  ...App,
})
