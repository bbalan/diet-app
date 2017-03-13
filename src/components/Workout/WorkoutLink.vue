<template>
  <md-list-item v-if="workoutData" class="workout__list__link">

    <div class="workout__list__link__inner">
      <router-link class="workout__edit wordwrap--fade" :to="{ name: 'editWorkout', params: { uuid: uuid }}">
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
      store.dispatch('entries/add', {
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
      padding-bottom 8px
      &:after
        display block
        content ''
        width 100%
        border-left 36px solid white
        height 1px
        background #eee
        position absolute
        bottom 0
        right 0
      &:last-child
        &:after
          display none
      &__inner
        position relative
        width 100%
  &__edit
    display block
    float left
    height 48px
    padding 8px 0 16px 0
    border-right 100px solid transparent
    width 100%
    text-decoration none !important
    overflow hidden

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
  width 100%
  padding-left 36px
  position absolute
  top 8px
  left 0
  height 22px
  overflow hidden
  border-right 100px solid white
  white-space nowrap

.button--track
  display block
  position absolute !important
  bottom 0
  right 0
  margin-right 0
  margin-left 16px
</style>