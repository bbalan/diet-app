import store from '.';
import { setLocalStorage, roundTo } from './Utils';

const MODULE_KEY = 'appSettings';

// Personal info about the user
const stateDefault = {
  unitWeight: 'imperial',
  unitHeight: 'imperial',
  numMeals: null,
};

const stateLocalStorage = JSON.parse(
  localStorage.getItem(MODULE_KEY)
);

export default {
  namespaced: true,
  state: stateLocalStorage || stateDefault,
  mutations: {
    setUnitWeight(state, val) {
      state.unitWeight = val;
      setLocalStorage(MODULE_KEY, state);
    },
    setUnitHeight(state, unit) {
      state.unitHeight = unit;

      if (unit === 'imperial') {
        // Round metric height unit to nearest imperial unit
        const height = store.state.userInfo.height;
        const roundedHeight = Math.floor(roundTo(height, 2.54));

        store.commit('userInfo/setHeight', roundedHeight);
      }

      setLocalStorage(MODULE_KEY, state);
    },
    setNumMeals(state, val) {
      state.numMeals = val;
      setLocalStorage(MODULE_KEY, state);
    },
  },
};
