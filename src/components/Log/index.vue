<template>
  <div class="log">
    <div class="grid__outer">
      <day v-for="(dataDay, date) in calendar" :dataDay="dataDay" :date="date">
      </day>
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
    calendar: {
      get() {
        return store.state.calendar.data
      },
    },
    currentDay() {
      return store.state.calendar.currentDay
    },
    dateFormatted() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const parsed = new Date(Date.parse(this.currentDay))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}`

      return formatted
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
  border-top 64px solid transparent
  overflow-x hidden
  overflow-y scroll
</style>
