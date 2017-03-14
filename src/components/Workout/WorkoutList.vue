<template>
  <md-card class="workout__list">
    <md-card-header class="md-headline md-title">
      Saved workouts
    </md-card-header>
    <md-card-content>
      <md-list v-if="reversed.length">
        <workout-link
          v-for="workout in reversed"
          :name="workout.name"
          :calories="workout.calories"
          :id="workout.id">
        </workout-link>
      </md-list>
      <div v-else class="md-body-1 saved-workout">
        <md-icon class="saved-workout__icon">access_time</md-icon>
        Your saved workouts will appear here.
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import store from 'store'
import WorkoutLink from 'components/Workout/WorkoutLink'

export default {
  name: 'WorkoutList',
  components: { WorkoutLink },
  computed: {
    workouts: () => store.state.workouts.data,
    reversed() {
      return this.workouts.slice().reverse()
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

.saved-workout
  padding-left 32px
  position relative
  &__icon
    position absolute !important
    left 0
    top 0
    color rgba(0,0,0,.54)
    margin-right 8px !important
</style>