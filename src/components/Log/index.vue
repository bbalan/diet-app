<template>
  <div>
    <h1>Log</h1>
    <day v-for="(dataDay, date) in days" :dataDay="dataDay" :date="date">
    </day>
  </div>
</template>

<script>
import store from '../../store'
import Day from './Day'

export default {
  name: 'Log',
  components: { Day },
  computed: {
    // TODO: sort days by date
    days: {
      get() {
        return store.state.log.days
      },
    },
  },
}
</script>

<style scoped>

</style>
