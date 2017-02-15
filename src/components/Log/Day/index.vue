<template>
  <div class="log__day" v-if="true || filteredEntries.length || isToday">

    {{ mass | toMassUnit }}

    <macros 
      ref="macros"
      :entries="filteredEntries"
      :tdee="tdee">
    </macros>

    <router-link 
      :to="{ name: 'food' }" 
      class="addLog logFood" 
      @click.native="setCurrentDay">
      + Add food
    </router-link>

    <router-link 
      :to="{ name: 'workout' }" 
      class="addLog logWorkout" 
      @click.native="setCurrentDay">
      + Add workout
    </router-link>

    <router-link 
      :to="{ name: 'weighin' }" 
      class="addLog logWeight" 
      @click.native="setCurrentDay">
      + Weigh In
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
import { toMassUnit, roundTo } from 'util/filters'
import EntryList from 'components/Log/Day/EntryList'
import Macros from 'components/Log/Day/Macros'

export default {
  props: ['dataDay', 'date'],
  components: { EntryList, Macros },
  filters: { toMassUnit, roundTo },
  methods: {
    /* Set the "current Day", or the Day we navigated away from,
    so the New Entry component can add the entry to the correct day. */
    setCurrentDay() {
      store.commit('calendar/setCurrentDay', this.date)
    },
  },
  computed: {
    // This Day is displaying today's data.
    isToday() {
      return this.date === store.state.calendar.today
    },
    // Filter only keys that match a value in store.state.entries
    filteredEntries() {
      return this.dataDay.entries.filter(
        entryUUID => store.state.entries[entryUUID]
      )
    },
    // Get the user's latest TDEE
    tdee() {
      if (this.dataDay) return this.dataDay.userInfo.tdee
      return 0
    },
    mass() {
      if (this.dataDay) return this.dataDay.userInfo.mass
      return 0
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
  
.addLog
  font-size 20px
  font-weight bold
  color #42b983
  margin-right 20px
</style>