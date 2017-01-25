import Vue from 'vue';
import Vuex from 'vuex';

import userInfo from './UserInfo';
import appSettings from './AppSettings';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userInfo,
    appSettings,
  },
});

export default store;
