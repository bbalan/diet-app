<template>
  <div class="log__day">

    <div>
      <h2>{{ dateFormatted }}</h2>
      <router-link :to="routes.NewFood" class="logFood">+</router-link>
    </div>

    <macros 
      v-if="filteredEntries.length" 
      ref="macros"
      :entries="filteredEntries"
      :tdee="tdee">
    </macros>

    <entry-list 
      v-if="filteredEntries.length" 
      :entries="filteredEntries">
    </entry-list>

    <div v-if="filteredEntries.length === 0">No entries today!</div>

  </div>
</template>

<script>
import store from 'store'
/* eslint-disable no-unused-vars */
import routes from 'router/routes'
import EntryList from 'components/Log/Day/EntryList'
import Macros from 'components/Log/Day/Macros'

export default {
  props: ['dataDay', 'date'],
  components: { EntryList, Macros },
  data() {
    return { routes }
  },
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
    // Filter only keys that match a value in store.state.entries.data
    filteredEntries() {
      return this.dataDay.entries.filter(
        entryUUID => store.state.entries.data[entryUUID]
      )
    },
    tdee() {
      return store.state.days.data[this.date].tdee
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
h2
  display inline
.logFood
  font-size 20px
  font-weight bold
  color #42b983
</style>