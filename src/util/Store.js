import Vue from 'vue';
import Vuex from 'vuex';

const stateDefault = {
  testVal: 100,
};

const stateFromLocalStorage = JSON.parse(localStorage.getItem('testState'));

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

// TODO: move this into its own utils file
function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

const KEY = 'userInfo';

// Personal info about the user
const stateUserInfoDefault = {
  birthday: null,
  birthdayTimestamp: null,
  age: null,
  gender: null,
  height: 177,
  weight: null,
  goal: null,
  goalSpeed: null,
  activityLevel: 1,
};

const stateUserInfoLS = JSON.parse(localStorage.getItem(KEY));

const moduleUserInfo = {
  namespaced: true,
  state: stateUserInfoLS || stateUserInfoDefault,
  mutations: {
    /** Translates the user's birthday into a timestamp, and calculates their age. */
    setBirthday(state, birthday) {
      const today = new Date().getTime();
      const birthdayTimestamp = new Date(birthday).getTime();
      const secondsInAYear = 365 * 24 * 60 * 60;
      const age = Math.round(((today - birthdayTimestamp) / secondsInAYear / 1000) * 10) / 10;

      state.birthday = birthday;
      state.birthdayTimestamp = birthdayTimestamp;
      state.age = age;

      setLocalStorage(KEY, state);
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
    moduleUserInfo,
  },
});

export default store;
