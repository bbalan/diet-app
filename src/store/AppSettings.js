import setLocalStorage from './Utils';

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
    setUnitHeight(state, val) {
      state.unitHeight = val;
      setLocalStorage(MODULE_KEY, state);
    },
    setNumMeals(state, val) {
      state.numMeals = val;
      setLocalStorage(MODULE_KEY, state);
    },
  },
};
