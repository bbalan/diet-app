/* eslint-disable */
import Vue from 'vue'
import router from 'router'
import App from 'components/App'
import paths from 'router/paths'
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.js'
import 'assets/styles/fonts.css'
import 'assets/material.blue-lime.min.css'
import 'assets/styles/global.styl'

const app = new Vue({
  el: '#app',
  router,
  ...App,
})
