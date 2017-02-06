<template>
  <div class="log__day" v-if="true || filteredEntries.length || isToday">

    <h2>{{ dateFormatted }}</h2>

    <macros 
      ref="macros"
      :entries="filteredEntries"
      :tdee="tdee">
    </macros>

    <router-link 
      :to="routes.NewFood" 
      class="logFood" 
      @click.native="setCurrentDay">
      + Add food
    </router-link>

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
  methods: {
    /* Set the "current Day", or the Day we navigated away from,
    so the New Entry component can add the entry to the correct day. */
    setCurrentDay() {
      store.commit('days/setCurrentDay', this.date)
    },
  },
  computed: {
    // This Day is displaying today's data.
    isToday() {
      return this.date === store.state.days.today
    },
    // Format this Day's full date as: February X, 20XX
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
    // Get the user's latest TDEE
    tdee() {
      return store.state.days.data[this.date].tdee
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
  
.logFood
  font-size 20px
  font-weight bold
  color #42b983
</style>