<template>
  <div class="workout--preset page page--menu page--padded max-width">

    <view-workout
      v-if="workoutData"
      :name="workoutData.name"
      :calories="workoutData.calories"
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
  name: 'WorkoutPreset',
  props: ['uuid'],
  components: { ViewWorkout },
  computed: {
    workoutData() { return store.state.workout[this.uuid] },
  },
  methods: {
    onSubmit(data) {
      store.commit('workout/edit', { uuid: this.uuid, data })
      router.go(-1)
    },
  },
}
</script>