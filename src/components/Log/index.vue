<template>
  <div class="log solid__bg page page--main page--menu">
    
    <day :dataDay="dataCurrentDay" :date="currentDay"></day>

    <md-button class="md-fab md-fab-bottom-right" @click.native="onClickFood">
      <md-icon>add</md-icon>
    </md-button>

    <!--<router-link :to="{ name: 'food' }">
      <md-button class="md-fab md-fab-bottom-right log__food">
        <md-icon>restaurant</md-icon>
      </md-button>
    </router-link>

    <router-link :to="{ name: 'workout' }">
      <md-button class="md-fab md-fab-bottom-right log__workout md-primary">
        <md-icon>fitness_center</md-icon>
      </md-button>
    </router-link>-->
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import Day from 'components/Log/Day'

export default {
  name: 'Log',
  components: { Day },
  computed: {
    calendar() {
      return store.state.calendar.data
    },
    currentDay() {
      if (this.calendar) return store.state.calendar.currentDay
      return null
    },
    dataCurrentDay() {
      if (this.calendar) return store.state.calendar.data[this.currentDay]
      return null
    },
  },
  methods: {
    onClickFood() {
      router.push({ name: 'food' })
      // const isSpeedDialOpen = this.$refs.speedDial.$el.classList.contains('md-active')
      // if (isSpeedDialOpen) router.push({ name: 'food' })
    },
    onClickWorkout() {
      router.push({ name: 'workout' })
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
  overflow-y hidden

  &__workout
    bottom 96px !important

</style>
