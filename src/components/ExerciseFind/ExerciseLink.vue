<template>
  <div v-if="exerciseData" class="exerciseLink">

    <div class="entry__info" v-if="!deleteTimeout">
      <button @click="deleteEntry">X</button>
      <router-link :to="`/entry/${uuid}`">
        <span class="exercise__name">{{ name | capitalize }}</span>
      </router-link>
      <span class="exercise__calories">{{ calories | toKcal }}</span>
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
  name: 'ExerciseList',
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