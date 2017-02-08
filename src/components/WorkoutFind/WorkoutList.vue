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
    workoutCache: () => store.state.workoutCache,
    numInCache() {
      if (!this.workoutCache) return 0
      return Object.keys(this.workoutCache).length
    },
    reversed() {
      const reversed = []
      /* eslint-disable no-restricted-syntax */
      for (const uuid in this.workoutCache) {
        if (Object.prototype.hasOwnProperty.call(this.workoutCache, uuid)) {
          reversed.unshift({
            uuid,
            data: this.workoutCache[uuid],
          })
        }
      }
      return reversed
    },
  },
}
</script>