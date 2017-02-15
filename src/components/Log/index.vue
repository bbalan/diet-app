<template>
  <div class="log solid__bg page page--main page--menu">
    <div class="grid__outer">
      <day :dataDay="dataCurrentDay" :date="currentDay"></day>
    </div>

    <router-link :to="{ name: 'food' }">
      <md-button class="md-fab md-fab-bottom-right log__food">
        <md-icon>restaurant</md-icon>
      </md-button>
    </router-link>

    <router-link :to="{ name: 'workout' }">
      <md-button class="md-fab md-fab-bottom-right log__workout md-primary">
        <md-icon>fitness_center</md-icon>
      </md-button>
    </router-link>
  </div>
</template>

<script>
import store from 'store'
import Day from 'components/Log/Day'

export default {
  name: 'Log',
  components: { Day },
  computed: {
    // TODO: sort calendar by date
    calendar() {
      return store.state.calendar.data
    },
    currentDay() {
      return store.state.calendar.currentDay
    },
    dataCurrentDay() {
      return store.state.calendar.data[this.currentDay]
    },
  },
}
</script>

<style scoped lang="stylus">
.log
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  box-sizing border-box
  border-top 56px solid transparent
  overflow-x hidden
  overflow-y scroll

  &__workout
    bottom 96px !important

</style>
