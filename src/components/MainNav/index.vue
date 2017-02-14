<template>
  <header>
    <!-- TODO: show bar automatically at width > 1160px -->
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="main-nav">
      <div class="md-toolbar-container">
        
        <transition name="main-nav">
          <md-button 
            v-if="isSidebarEnabled"
            class="md-icon-button main-nav-open"
            @click.native="toggleLeftSidenav">
            <md-icon>menu</md-icon>
          </md-button>
        </transition>

        <transition name="main-nav-back">
          <md-button 
            v-if="!isSidebarEnabled"
            class="md-icon-button main-nav-open main-nav-back"
            @click.native="goBack">
            <md-icon>arrow_back</md-icon>
          </md-button>
        </transition>

        <h2 class="md-title main-nav-title" style="flex: 1">{{ pageTitle }}</h2>
        
        <transition name="side-menu">
          <md-menu 
            v-if="isEntry"
            md-size="2" 
            md-direction="bottom left"
            class="side-menu">

            <md-button md-menu-trigger class="md-icon-button menu-button">
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item @click.native="onEntryDelete">Delete</md-menu-item>
            </md-menu-content>

          </md-menu>
        </transition>
      </div>
    </md-whiteframe>

    <md-sidenav 
      v-if="isSidebarEnabled"
      :md-swipeable="true"
      :md-swipe-distance="50" 
      :md-swipe-threshold="50"
      class="md-left" 
      ref="leftSidenav">

      <md-list @click.native="toggleLeftSidenav">
        <md-subheader>Tracking</md-subheader>

        <md-list-item>
          <router-link :to="{ name: 'log' }">
            <md-icon>assignment</md-icon>
            <span>Log</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="{ name: 'foodSearch' }">
            <md-icon>restaurant</md-icon>
            <span>Food</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="{ name: 'workout' }">
            <md-icon>fitness_center</md-icon>
            <span>Workouts</span>
          </router-link>
        </md-list-item>

        <!--<md-divider class="md-inset"></md-divider>-->
        <md-divider></md-divider>

        <md-subheader>Configuration</md-subheader>
        
        <md-list-item disabled>
          <router-link :to="{ name: 'profile' }">
            <md-icon>account_circle</md-icon>
            <span>Profile</span>
          </router-link>
        </md-list-item>

        <md-list-item disabled>
          <router-link :to="{ name: 'settings' }">
            <md-icon>settings</md-icon>
            <span>Settings</span>
          </router-link>
        </md-list-item>

        <!--<md-divider class="md-inset"></md-divider>-->
        <md-divider></md-divider>

        <md-subheader>Dev</md-subheader>

        <md-list-item>
          <router-link :to="{ name: 'welcome' }">
            <md-icon>code</md-icon>
            <span>Welcome page</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="{ name: 'devCache' }">
            <md-icon>code</md-icon>
            <span>Cache</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="{ name: 'devLocalStorage' }">
            <md-icon>code</md-icon>
            <span>LocalStorage</span>
          </router-link>
        </md-list-item>

      </md-list>

    </md-sidenav>

  </header>
</template>

<script>
import store from 'store'
import router from 'router'

export default {
  computed: {
    signupComplete: () => store.state.appSettings.signupComplete,
    pageTitle() {
      let title = this.$route.meta.title

      if (this.isLog) {
        if (store.state.calendar.currentDay === store.state.calendar.today) {
          title = 'Today'
        } else {
          title = this.currentDayFormatted
        }
      }

      return title
    },
    isLog() {
      return this.$route.name === 'log'
    },
    isEntryWorkout() {
      if (!this.isEntry) return false
      const entryData = store.state.entries[this.$route.params.uuid]
      if (!entryData) return false
      return entryData.type === 'workout'
    },
    isWelcome() {
      return this.$route.name === 'welcome'
    },
    isSidebarEnabled() {
      return this.$route.meta.sidebar
    },
    isEntry() {
      return this.$route.name === 'entry'
    },
    entryUUID() {
      if (this.isEntry) return this.$route.params.uuid
      return null
    },
    currentDayFormatted() {
      const currentDay = store.state.calendar.currentDay
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const parsed = new Date(Date.parse(currentDay))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}`

      return formatted
    },
  },
  methods: {
    toggleLeftSidenav() {
      const sidenav = this.$refs.leftSidenav
      if (sidenav) sidenav.toggle()
    },
    goBack() {
      router.push({ name: 'log' })
    },
    onEntryDelete() {
      store.commit('entries/delete', { uuid: this.entryUUID })
      router.push({ name: 'log' })
    },
  },
}
</script>

<style lang="stylus">
.md-toolbar
  padding 0
  min-height 56px !important
  height 56px !important

  &-container
    padding 0 8px
    min-height 56px !important
    height 56px !important

.menu-button
  margin-right -8px !important

.md-sidenav
  box-shadow none !important
  &-content
    box-shadow none !important

.main-nav
  &-open
    position absolute !important
    left 8px
    top 8px
  &-title
    position absolute
    left 56px
    top 16px

.md-menu-content
  min-height 48px !important
  .md-list
    padding 0

// Transitions
.side-menu
  position absolute
  top 8px
  right 8px

  &-enter-active
  &-leave-active
    transition all .2s
    
  &-enter
  &-leave-to
    opacity 0
    /*transform scale(.5)*/
    transform-origin 70% center

.main-nav
  &-enter-active
  &-leave-active
    transition all .4s ease-out
    
  &-enter
  &-leave-to
    opacity 0
    transform rotate(180deg) scale(1, .2)

.main-nav-back
  transform rotate(0deg)

  &-enter-active
  &-leave-active
    transition all .4s ease-out
    transform rotate(0deg)
    
  &-enter
  &-leave-to
    opacity 0
    transform rotate(-90deg)
</style>