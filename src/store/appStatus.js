// Temporary app states kept here so that MainNav can display corresponding menus
export default {
  namespaced: true,
  state: {
    workout: {
      isEditingName: false,
    },
  },
  mutations: {
    workoutStartEditingName(state) {
      state.workout.isEditingName = true
    },
    workoutStopEditingName(state) {
      state.workout.isEditingName = false
    },
  },
}
