<template>
  <md-list-item v-if="workoutData" class="workout__list__link">

    <div class="workout__list__link__inner">
      <router-link class="workout__edit" :to="{ name: 'workoutPreset', params: { uuid: uuid }}">
        <md-icon>create</md-icon>
        <span class="workout__name">{{ name | capitalize }}</span>
      
        <span class="workout__calories md-caption">
          {{ calories | roundTo | toKcal }} 
        </span>
      </router-link>

      <md-button @click.native="logEntry" class="md-raised md-primary button--track">
        Add
      </md-button>
    </div>

  </md-list-item>
</template>

<script>
import store from 'store'
import router from 'router'
import { toKcal, capitalize, roundTo } from 'util/filters'

export default {
  name: 'WorkoutLink',
  props: ['workoutData', 'uuid'],
  filters: { toKcal, capitalize, roundTo },
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
.workout
  &__list
    &__link
      &__inner
        position relative
        width 100%
  &__edit
    display block
    float left
    height 48px
    padding 8px 0 16px 0
    max-width 40%

    .md-icon
      margin-right 8px
      position relative
      top 4px

.workout__calories
  display block
  height 48px
  padding 12px 0
  position absolute
  top 16px
  left 36px

.workout__name 
  display inline-block

.button--track
  display block
  float right
  margin-right 0
  margin-left 16px
</style>