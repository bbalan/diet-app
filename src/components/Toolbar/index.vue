<template>
  <header>

    <!-- TODO: show sidebar/RightMenu automatically at width >= 1160px -->

    <transition name="page-fade">
      <md-whiteframe v-if="!isWelcome" md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="toolbar">
        <div class="md-toolbar-container">

          <left-menu @evtToggleSidenav="toggleSidenav"></left-menu>

          <search-bar></search-bar>

          <h2 class="md-title toolbar__title" style="flex: 1">
            <span v-if="!isLog">{{ pageTitle }}</span>
            <span v-else>
              <input type="date" class="date-selector" v-model="currentDay">
              {{ pageTitle }}
              <md-icon>arrow_drop_down</md-icon>
            </span>
          </h2>

          <right-menu></right-menu>
        </div>
      </md-whiteframe>
    </transition>

    <sidenav ref="sidenav"></sidenav>

  </header>
</template>

<script>
import store from 'store'
import RightMenu from 'components/Toolbar/RightMenu'
import LeftMenu from 'components/Toolbar/LeftMenu'
import Sidenav from 'components/Toolbar/Sidenav'
import SearchBar from 'components/Toolbar/SearchBar'

export default {
  data() {
    return {
      searchOpen: false,
    }
  },
  components: { RightMenu, LeftMenu, Sidenav, SearchBar },
  computed: {
    currentDay: {
      get: () => store.state.calendar.currentDay,
      set(date) {
        store.commit('calendar/setCurrentDay', date)
      },
    },
    signupComplete: () => store.state.appSettings.signupComplete,
    pageTitle() {
      let title = this.$route.meta.title

      if (this.isLog) {
        if (store.state.calendar.currentDay === store.state.calendar.today) {
          title = 'Today'
        } else {
          title = this.logDate
        }
      }

      return title
    },
    isWelcome() { return this.$route.name === 'welcome' },
    isLog() { return this.$route.name === 'log' },
    logDate() {
      const currentDay = store.state.calendar.currentDay
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const parsed = new Date(Date.parse(currentDay))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}`

      return formatted
    },
  },
  methods: {
    toggleSidenav() { this.$refs.sidenav.toggleSidenav() },
  },
}
</script>

<style scoped lang="stylus">

.toolbar
  position fixed
  top 0
  left 0
  z-index 5 !important
  padding 0
  width 100%
  min-height 56px !important
  height 56px !important

  .md-toolbar-container
    padding 0 8px
    min-height 56px !important
    height 56px !important

  &__title
    position absolute
    left 56px
    top 16px

    .date-selector
      position absolute
      top 0
      left 100px
      width 100%
      height 100%
      opacity 1

  // Transitions
  &-enter-active
  &-leave-active
    opacity 1
    transition all .2s ease-out
    transform translate3d(0, 0, 0)

  &-enter
  &-leave-to
    opacity 0
    transform translate3d(0, -56px, 0)
</style>