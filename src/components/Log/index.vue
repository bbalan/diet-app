<template>
  <div>
    <h1>Log</h1>
    <entry-list 
      v-for="(dataDay, date) in days" 
      :entries="dataDay.entries" 
      :date="date">
    </entry-list>
  </div>
</template>

<script>
import store from '../../store'
import EntryList from './EntryList'

export default {
  name: 'Log',
  components: { EntryList },
  computed: {
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
