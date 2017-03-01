<template>
  <div class="log__day page page--bg-grey" v-if="true || filteredEntries.length || isToday">

    <dashboard
      ref="dashboard"
      :entries="filteredEntries"
      :tdee="tdee">
    </dashboard>

    <div class="log__day__scroll">

      <transition name="fade">
        <md-card class="weigh-in" v-if="!massUpdated">
          <div class="page--padded">
            <p class="md-subheading">It's time to log your body weight!</p>

            <router-link :to="{ name: 'weight' }" class="addLog logWeight">
              <md-button class="md-raised md-primary">
                Weigh In
              </md-button>
            </router-link>
          </div>
        </md-card>
      </transition>

      <entry-list
        v-if="filteredEntries.length"
        :entries="filteredEntries">
      </entry-list>

      <div v-if="filteredEntries.length === 0 && massUpdated" class="no-entries">
        Food and workouts that you add to the log will appear here.
      </div>

    </div>

  </div>
</template>

<script>
import store from 'store'
import { toMassUnit, roundTo } from 'util/filters'
import EntryList from 'components/Log/Day/EntryList'
import Dashboard from 'components/Log/Day/Dashboard'

export default {
  props: ['dataDay', 'date'],
  components: { EntryList, Dashboard },
  filters: { toMassUnit, roundTo },
  computed: {
    // This Day is displaying today's data.
    isToday() { return this.date === store.state.calendar.today },

    // Filter only keys that match a value in store.state.entries
    filteredEntries() {
      return this.dataDay.entries.filter(
        entryUUID => store.state.entries[entryUUID]
      )
    },

    // Get the user's latest TDEE
    tdee() {
      if (this.dataDay && this.dataDay.userInfo.metrics) {
        return this.dataDay.userInfo.metrics.tdee
      }
      return store.state.userInfo.metrics.tdee
    },

    mass() {
      if (this.dataDay && this.dataDay.userInfo.metrics) {
        return this.dataDay.userInfo.metrics.mass
      }
      return store.state.userInfo.metrics.mass
    },

    massUpdated() { return this.dataDay ? this.dataDay.userInfo.massUpdated : false },
  },
}
</script>

<style scoped lang="stylus">
.log__day
  overflow-x hidden
  overflow-y hidden

  &__scroll
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    box-sizing border-box
    border-top 80px solid transparent
    overflow-x hidden
    overflow-y scroll

.nutrient
  margin-right 20px

.addLog
  font-size 20px
  font-weight bold
  color #42b983

.weigh-in
  position absolute
  top 50%
  left 50%
  margin-top -52px
  margin-left -140px
  text-align center
  margin-bottom 16px

.no-entries
  position absolute
  top 50%
  margin-top -40px
  padding 16px 32px
  text-align center
</style>