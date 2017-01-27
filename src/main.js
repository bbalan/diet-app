/* 
The Vue build version to load with the `import` command (runtime-only or standalone) has been set in webpack.base.conf with an alias.
*/

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App';
import router from './router';

// Firebase stuff
/* eslint-disable no-unused-vars */
// import Firebase from 'firebase';
// import VueFire from 'vuefire';
// import firebaseDB from './util/Firebase';

// Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App,
});
