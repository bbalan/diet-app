<template>
  <div>
    <!--<h1>Log</h1>-->
    <day v-for="(dataDay, date) in calendar" :dataDay="dataDay" :date="date">
    </day>
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
  },
}
</script>

<style scoped>

</style>
