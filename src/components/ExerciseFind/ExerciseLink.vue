<template>
  <div v-if="exerciseData" class="exerciseLink">

    <div class="entry__info" v-if="!deleteTimeout">
      <button @click="deleteEntry">X</button>
      <span class="exercise__name">{{ name | capitalize }}</span>
      <span class="exercise__calories">{{ calories | toKcal }}</span>

      <router-link class="exercise_edit" :to="`/exercise/${uuid}`">Edit</router-link>
    </div>

    <div class="entry__undo-delete" v-if="deleteTimeout">
      Deleted
      <button @click="undoDelete">Undo</button>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { toKcal, capitalize } from 'util/filters'

export default {
  name: 'ExerciseLink',
  props: ['exerciseData', 'uuid'],
  filters: { toKcal, capitalize },
  data() {
    return {
      deleteTimeout: null,
      deleteTime: 2000,
    }
  },
  computed: {
    name() {
      return this.exerciseData.name
    },
    calories() {
      return this.exerciseData.calories
    },
  },
  methods: {
    // Remove this entry forever
    deleteEntry() {
      this.deleteTimeout = setTimeout(() => {
        store.commit('exerciseCache/delete', { uuid: this.uuid })
        this.deleteTimeout = null
      }, this.deleteTime)
    },
    undoDelete() {
      clearTimeout(this.deleteTimeout)
      this.deleteTimeout = null
    },
  },
}
</script>

<style scoped lang="stylus">
.exercise__calories
  font-weight bold
  float right
</style>