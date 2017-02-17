<template>
  <div class="page--padded page page--main page--menu page--workout">
    <entry-workout></entry-workout>
    <workout-list></workout-list>
  </div>
</template>

<script>
import EntryWorkout from 'components/Entry/Workout'
import WorkoutList from 'components/WorkoutFind/WorkoutList'

export default {
  name: 'WorkoutFind',
  components: { WorkoutList, EntryWorkout },
}
</script>

<style scoped lang="stylus">
.page--workout
  background #eee
</style>