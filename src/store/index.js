import Vue from 'vue';
import Vuex from 'vuex';

import userInfo from './userInfo';
import appSettings from './appSettings';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userInfo,
    appSettings,
  },
});

export default store;
