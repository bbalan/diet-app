<template>
  <header>

    <!-- TODO: show sidebar/RightMenu automatically at width >= 1160px -->

    <transition name="page-fade">
      <md-whiteframe v-if="!isWelcome" md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="toolbar">
        <div class="md-toolbar-container max-width">

          <left-menu @evtToggleSidenav="toggleSidenav"></left-menu>

          <search-bar ref="searchBar"></search-bar>

          <!-- TODO: better calendar dropdown -->

          <h2 class="md-title toolbar__title" style="flex: 1">
            <span v-if="!isLog">{{ pageTitle }}</span>
            <span v-else>
              <input type="date" class="date-selector" v-model="currentDay">
              {{ pageTitle }}
              <md-icon>arrow_drop_down</md-icon>
            </span>
          </h2>

          <!-- TODO: nicer transition for buttons -->
          <transition name="fade">
            <md-button
              v-if="!isToday && isLog"
              class="md-icon-button toolbar__today"
              @click.native="goToToday">
              <md-icon>today</md-icon>
            </md-button>
          </transition>

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
    isToday: () => store.state.calendar.currentDay === store.state.calendar.today,
    signupComplete: () => store.state.config.signupComplete,
    pageTitle() {
      let title = this.$route.meta.title

      if (this.isLog) {
        if (this.isToday) {
          title = 'Today'
        } else {
          title = this.logDate
        }
      }

      if (this.isRecipe) {
        title = this.isRecipeEnabled ? 'Edit Recipe' : 'Add Recipe'
      }

      return title
    },
    isWelcome() { return this.$route.name === 'welcome' },
    isLog() { return this.$route.name === 'log' },
    isRecipe() { return this.$route.name === 'editRecipe' },
    isRecipeEnabled() {
      const recipe = store.state.recipe.data[this.$route.params.uuid]
      return recipe ? recipe.enabled : null
    },
    logDate() {
      const currentDay = store.state.calendar.currentDay
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ]

      const parsed = new Date(Date.parse(currentDay))
      const formatted = `${months[parsed.getUTCMonth()]} ${parsed.getUTCDate()}`

      return formatted
    },
  },
  methods: {
    toggleSidenav() { this.$refs.sidenav.toggleSidenav() },
    goToToday() { store.dispatch('calendar/goToToday') },
    openSearch() { this.$refs.searchBar.open() },
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
    padding 0
    min-height 56px !important
    height 56px !important

  &__today
    position absolute
    left 50%
    margin-left -12px

  &__title
    position absolute
    left 72px
    top 16px

    .date-selector
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      opacity 0

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