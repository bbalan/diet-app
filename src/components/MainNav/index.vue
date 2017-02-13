<template>
  <header>
    <!-- TODO: show bar automatically at width > 1160px -->
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="main-toolbar">
      <div class="md-toolbar-container">
        <md-button 
          v-if="isSidebarEnabled"
          class="md-icon-button"
          @click.native="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <md-button 
          v-else
          class="md-icon-button"
          @click.native="goBack">
          <md-icon>arrow_back</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">{{ pageTitle }}</h2>
        
        <md-menu 
          v-if="isEntry"
          md-size="2" 
          md-direction="bottom left">

          <md-button md-menu-trigger class="md-icon-button menu-button">
            <md-icon>more_vert</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item @click.native="onEntryDelete">Delete</md-menu-item>
          </md-menu-content>
          
        </md-menu>
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
          <router-link :to="{ name: 'food' }">
            <md-icon>restaurant</md-icon>
            <span>Track food</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link :to="{ name: 'workout' }">
            <md-icon>fitness_center</md-icon>
            <span>Track workout</span>
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
      return this.$route.meta.title
    },
    isLog() {
      return this.$route.name === 'log'
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
  },
  methods: {
    toggleLeftSidenav() {
      const sidenav = this.$refs.leftSidenav
      if (sidenav) sidenav.toggle()
    },
    goBack() {
      router.go(-1)
    },
    onEntryDelete() {
      store.commit('entries/delete', { uuid: this.entryUUID })
      router.push('/log')
    },
  },
}
</script>

<style lang="stylus">
.md-toolbar
  padding 0

  &-container
    padding 0 8px

.md-sidenav
  &-content
    box-shadow none !important

.menu-button
  position relative
  right -16px

.md-menu-content
  min-height 48px !important
  .md-list
    padding 0
/*.md-tabs
  &-navigation
    .md-tab-indicator
      background white !important*/
</style>