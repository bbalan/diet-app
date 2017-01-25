import setLocalStorage from './Utils';

const MODULE_KEY = 'userInfo';

// Personal info about the user
const stateDefault = {
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

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
);

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
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

      setLocalStorage(MODULE_KEY, state);
    },
    setGender(state, gender) {
      state.gender = gender;
      setLocalStorage(MODULE_KEY, state);
    },
  },
};
