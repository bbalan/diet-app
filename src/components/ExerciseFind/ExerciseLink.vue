<template>
  <div v-if="exerciseData" class="exerciseLink">

    <div class="entry__info">
      <router-link class="exercise_edit" :to="`/exercise/${uuid}`">Edit</router-link>

      <span class="exercise__name">{{ name | capitalize }}</span>
      <span class="exercise__calories">
        {{ calories | toKcal }} 
        <button @click="logEntry">Log</button>
      </span>

    </div>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import { toKcal, capitalize } from 'util/filters'

export default {
  name: 'ExerciseLink',
  props: ['exerciseData', 'uuid'],
  filters: { toKcal, capitalize },
  data() {
    return {
      name: null,
      calories: null,
    }
  },
  created() {
    if (this.exerciseData) {
      this.name = this.exerciseData.name
      this.calories = this.exerciseData.calories
    }
  },
  methods: {
    logEntry() {
      store.commit('entries/add', {
        item: null,
        type: 'exercise',
        data: {
          name: this.name,
          calories: this.calories,
        },
      })
      router.push('/log')
    },
  },
}
</script>

<style scoped lang="stylus">
.exercise__calories
  font-weight bold
  float right

.exercise__name 
  display inline-block
  width 200px
</style>