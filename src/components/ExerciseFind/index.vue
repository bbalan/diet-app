<template>
  <div>
    <h1>Exercise find</h1>
    <entry-exercise></entry-exercise>
    <exercise-list></exercise-list>
  </div>
</template>

<script>
import EntryExercise from 'components/Entry/Exercise'
import ExerciseList from 'components/ExerciseFind/ExerciseList'

export default {
  name: 'ExerciseFind',
  components: { ExerciseList, EntryExercise },
}
</script>