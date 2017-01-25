// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue and plugins
import Vue from 'vue';
import VueRouter from 'vue-router';
/* eslint-disable no-unused-vars */
// import Firebase from 'firebase';
// import VueFire from 'vuefire';
// import firebaseDB from './util/Firebase';

// Components
import App from './components/App';
import router from './util/Routes';

Vue.use(VueRouter);
// Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
