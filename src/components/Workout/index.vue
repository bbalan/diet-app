<template>
  <div class="page page--menu page--workout page--bg-grey">
    <div class="max-width page--padded">
      <entry-workout></entry-workout>
      <workout-list></workout-list>
    </div>
  </div>
</template>

<script>
import EntryWorkout from 'components/Entry/Add/Workout'
import WorkoutList from 'components/Workout/WorkoutList'

export default {
  name: 'Workout',
  components: { WorkoutList, EntryWorkout },
}
</script>

<style scoped lang="stylus">
.page--workout
  background #eee
</style>