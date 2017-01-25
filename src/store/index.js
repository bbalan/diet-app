import Vue from 'vue';
import Vuex from 'vuex';

import UserInfo from './UserInfo';

// const data = {
//   userInfo: {
//     birthday: null,
//     age: null,
//     gender: null,
//     height: 177,
//     weight: null,
//     goal: null,
//     goalSpeed: null,
//     activityLevel: 1,
//   },
//   userSettings: {
//     unitWeight: 'imperial',
//     unitHeight: 'imperial',
//     numMeals: null,
//   },
// };

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    UserInfo,
  },
});

export default store;
