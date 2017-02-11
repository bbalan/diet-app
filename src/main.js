/* eslint-disable */
import Vue from 'vue'
import router from 'router'
import App from 'components/App'
import paths from 'router/paths'

// https://getmdl.io/components
import 'material-design-lite/material.min.css'
// import 'assets/material.blue-lime.min.css'
// import 'assets/material.brown-light_green.min.css'
import 'material-design-lite/material.js'

// https://github.com/CreativeIT/getmdl-select
import 'getmdl-select/getmdl-select.min.css'
import 'getmdl-select/getmdl-select.min.js'

import 'assets/styles/fonts.css'
import 'assets/styles/global.styl'

const app = new Vue({
  el: '#app',
  router,
  ...App,
})
