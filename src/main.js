/* eslint-disable */
import Vue from 'vue'
import VueMaterial from 'vue-material'
import router from 'router'
import App from 'components/App'
import 'swiper/dist/css/swiper.min.css'
import 'vue-material/dist/vue-material.css'
import 'assets/styles/fonts.css'
import 'assets/styles/global.styl'

Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red',
  },
})

const app = new Vue({
  el: '#app',
  router,
  ...App,
})
