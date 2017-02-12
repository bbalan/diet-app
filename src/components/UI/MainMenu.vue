<template>
  <header>
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="main-toolbar">
      <div class="md-toolbar-container">
        <md-button 
          class="md-icon-button"
          @click.native="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">
          {{ pageTitle }}
        </h2>

        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>
      </div>
    </md-whiteframe>

    <md-sidenav 
      :md-swipeable="true"
      :md-swipe-distance="50" 
      class="md-left" 
      ref="leftSidenav"
      @click.native="toggleLeftSidenav">

      <md-list>
        <md-subheader>Tracking</md-subheader>

        <md-list-item>
          <router-link :to="paths.Log">
            <md-icon>assignment</md-icon>
            <span>Log</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="paths.FoodFind">
            <md-icon>restaurant</md-icon>
            <span>Track food</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="paths.WorkoutFind">
            <md-icon>fitness_center</md-icon>
            <span>Track workout</span>
          </router-link>
        </md-list-item>

        <!--<md-divider class="md-inset"></md-divider>-->
        <md-divider></md-divider>

        <md-subheader>Configuration</md-subheader>
        
        <md-list-item>
          <router-link :to="paths.Profile">
            <md-icon>account_circle</md-icon>
            <span>Profile</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="paths.Settings">
            <md-icon>settings</md-icon>
            <span>Settings</span>
          </router-link>
        </md-list-item>

        <!--<md-divider class="md-inset"></md-divider>-->
        <md-divider></md-divider>

        <md-subheader>Dev</md-subheader>

        <md-list-item>
          <router-link :to="paths.Welcome">
            <md-icon>code</md-icon>
            <span>Welcome page</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="paths.Cache">
            <md-icon>code</md-icon>
            <span>Cache</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="paths.LocalStorage">
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
import paths from 'router/paths'

export default {
  data() {
    return { paths }
  },
  computed: {
    signupComplete: () => store.state.appSettings.signupComplete,
    pageTitle() {
      return 'Title'
    },
    isLog() {
      return this.$route.path === paths.Log
    },
    isWelcome() {
      return this.$route.path === paths.Welcome
    },
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle()
    },
  },
}
</script>

<style scoped lang="stylus">
.mdl-layout__header
  transition all 0.2s ease-out
  overflow hidden

  .mdl-layout__drawer-button
    background-color rgba(0,0,0,0)
.mdl-hidden
  opacity 0
  height 0
  padding 0
  min-height 0
</style>