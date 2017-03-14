<template>
  <div class="workout--preset page page--menu page--padded max-width">

    <view-workout
      v-if="workoutData"
      :name="name"
      :calories="calories"
      submitText="Save"
      @submit="onSubmit">
    </view-workout>

    <h2 class="md-title" v-else>
      <md-icon>warning</md-icon>
      Workout not found
    </h2>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import ViewWorkout from 'components/Entry/Common/Workout'

export default {
  name: 'EditWorkout',
  props: { id: Number },
  components: { ViewWorkout },
  computed: {
    workoutData() {
      return store.state.workouts.data.find(workout => workout.id === this.id)
    },
    name: {
      get() {
        return this.workoutData ? this.workoutData.name : null
      },
    },
    calories: {
      get() {
        return this.workoutData ? this.workoutData.calories : null
      },
    },
  },
  methods: {
    onSubmit(data) {
      store.dispatch('workouts/edit', {
        id: this.id,
        name: data.name,
        calories: data.calories,
      })
      router.go(-1)
    },
  },
}
</script>