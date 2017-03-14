<template>
  <div class="page page--menu page--workout page--bg-grey">
    <div class="max-width page--padded">
      <add-workout></add-workout>
      <workout-list></workout-list>
    </div>
  </div>
</template>

<script>
import AddWorkout from 'components/Entry/Add/Workout'
import WorkoutList from 'components/Workout/WorkoutList'

export default {
  name: 'Workout',
  components: { WorkoutList, AddWorkout },
}
</script>

<style scoped lang="stylus">
.page--workout
  background #eee
</style>