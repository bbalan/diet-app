<template>
  <div>
    <!--<h1>Log</h1>-->
    <day v-for="(dataDay, date) in calendar" :dataDay="dataDay" :date="date">
    </day>
  </div>
</template>

<script>
import store from 'store'
import paths from 'router/paths'
import Day from 'components/Log/Day'

export default {
  name: 'Log',
  components: { Day },
  data() {
    return { paths }
  },
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
/*.main-toolbar
  position fixed
  width 100%
  top 0*/
</style>
