<template>
  <md-card class="workout__list">
    <md-card-header class="md-headline md-title">
      Saved workouts
    </md-card-header>
    <md-card-content>
      <md-list>
        <workout-link
          v-for="workout in reversed" 
          :workoutData="workout.data"
          :uuid="workout.uuid">
        </workout-link>
      </md-list>
    </md-card-content>
  </md-card>
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

<style lang="stylus">
ul.md-list
  padding 0
.workout__list__link 
  margin-bottom 8px
  &:last-child
    margin-bottom 0
  .md-list-item-container
    padding 0 !important
</style>