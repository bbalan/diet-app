<template>
  <div>
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