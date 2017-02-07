<template>
  <div>
    <h2>Previous exercises</h2>
    <!--<pre>{{exerciseCache}}</pre>-->
    <exercise-link
      v-for="(exercise, uuid) in exerciseCache" 
      :exerciseData="exercise"
      :uuid="uuid">
    </exercise-link>
    <p v-if="!numInCache">No exercises yet!</p>
  </div>
</template>

<script>
import store from 'store'
import ExerciseLink from 'components/ExerciseFind/ExerciseLink'

export default {
  name: 'ExerciseList',
  components: { ExerciseLink },
  computed: {
    exerciseCache: () => store.state.exerciseCache,
    numInCache() {
      if (!this.exerciseCache) return 0
      return Object.keys(this.exerciseCache).length
    },
  },
}
</script>