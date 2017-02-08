<template>
  <div v-if="workoutData" class="workoutLink">

    <div class="entry__info">
      <router-link class="workout_edit" :to="`/workout/${uuid}`">Edit</router-link>

      <span class="workout__name">{{ name | capitalize }}</span>
      <span class="workout__calories">
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
  name: 'WorkoutLink',
  props: ['workoutData', 'uuid'],
  filters: { toKcal, capitalize },
  data() {
    return {
      name: null,
      calories: null,
    }
  },
  created() {
    if (this.workoutData) {
      this.name = this.workoutData.name
      this.calories = this.workoutData.calories
    }
  },
  methods: {
    logEntry() {
      store.commit('entries/add', {
        item: null,
        type: 'workout',
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
.workout__calories
  font-weight bold
  float right

.workout__name 
  display inline-block
  width 200px
</style>