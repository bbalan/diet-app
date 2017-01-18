// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue and plugins
import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import App from './components/App';
import router from './util/Routes';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
