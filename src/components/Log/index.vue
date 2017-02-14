<template>
  <div class="log">
    <div class="grid__outer">
      <day :dataDay="dataCurrentDay" :date="currentDay"></day>
    </div>
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
</style>
