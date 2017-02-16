<template>
  <md-sidenav 
    :md-swipeable="true"
    :md-swipe-distance="50" 
    :md-swipe-threshold="50"
    class="md-left toolbar__sidenav" 
    ref="sidenav">

    <md-list @click.native="toggleSidenav">
      <md-subheader>Tracking</md-subheader>

      <md-list-item>
        <router-link :to="{ name: 'log' }">
          <md-icon>today</md-icon>
          <span>Today</span>
        </router-link>
      </md-list-item>

      <md-list-item>
        <router-link :to="{ name: 'food' }">
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
</template>

<script>
export default {
  name: 'Sidenav',
  methods: {
    toggleSidenav() { this.$refs.sidenav.toggle() },
  },
}
</script>

<style lang="stylus">
.toolbar__sidenav
  .md-sidenav-content
    /*box-shadow none !important*/
    .md-list-item
      .md-ink-ripple
        display none !important
</style>