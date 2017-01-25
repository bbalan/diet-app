import Vue from 'vue';
import Vuex from 'vuex';

const stateDefault = {
  testVal: 100,
};
console.log(localStorage.getItem('testState'));

const stateFromLocalStorage = JSON.parse(localStorage.getItem('testState'));

console.log(stateFromLocalStorage);

// The main source of truth for the app.
const moduleTest = {
  namespaced: true,
  state: stateFromLocalStorage || stateDefault,
  mutations: {
    testMutation(state) {
      state.testVal += 1;
      localStorage.setItem('testState', JSON.stringify(state));
    },
  },
};

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
    moduleTest,
  },
});

export default store;
