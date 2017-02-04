<template>
  <div class="log__day" v-if="filteredEntries.length > 0">
    <h2>{{ dateFormatted }}</h2>
    <macros :entries="filteredEntries"></macros>
    <entry-list :entries="filteredEntries"></entry-list>
  </div>
</template>

<script>
import store from '../../store'
import EntryList from './EntryList'
import Macros from './Macros'

export default {
  props: ['dataDay', 'date'],
  components: { EntryList, Macros },
  computed: {
    dateFormatted() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const parsed = new Date(Date.parse(this.date))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}, ${parsed.getFullYear()}`

      return formatted
    },
    // Filter only keys that match a value in store.state.log.entries
    filteredEntries() {
      return this.dataDay.entries.filter(
        entryUUID => store.state.log.entries[entryUUID]
      )
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
</style>