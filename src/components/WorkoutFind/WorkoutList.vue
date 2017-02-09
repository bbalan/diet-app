<template>
  <div>
    <h2>Previous workouts</h2>
    <workout-link
      v-for="workout in reversed" 
      :workoutData="workout.data"
      :uuid="workout.uuid">
    </workout-link>
    <p v-if="!numInCache">No workouts yet!</p>
  </div>
</template>

<script>
import store from 'store'
import WorkoutLink from 'components/WorkoutFind/WorkoutLink'

export default {
  name: 'WorkoutList',
  components: { WorkoutLink },
  computed: {
    workoutPresets: () => store.state.workoutPresets,
    numInCache() {
      if (!this.workoutPresets) return 0
      return Object.keys(this.workoutPresets).length
    },
    reversed() {
      const reversed = []
      /* eslint-disable no-restricted-syntax */
      for (const uuid in this.workoutPresets) {
        if (Object.prototype.hasOwnProperty.call(this.workoutPresets, uuid)) {
          reversed.unshift({
            uuid,
            data: this.workoutPresets[uuid],
          })
        }
      }
      return reversed
    },
  },
}
</script>