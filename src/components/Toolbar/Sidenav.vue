<template>
  <md-sidenav
    :md-swipeable="true"
    :md-swipe-distance="50"
    :md-swipe-threshold="50"
    class="md-left toolbar__sidenav"
    ref="sidenav">

    <md-list @click.native="toggleSidenav" class="toolbar__sidenav__list">

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

      <md-list-item>
        <router-link :to="{ name: 'addWeight' }">
          <md-icon>insert_chart</md-icon>
          <span>Weight</span>
        </router-link>
      </md-list-item>

      <md-divider></md-divider>

      <!--<md-list-item disabled>
        <router-link :to="{ name: 'profile' }">
          <md-icon>account_circle</md-icon>
          <span>Profile</span>
        </router-link>
      </md-list-item>-->

      <!--<md-list-item disabled>
        <router-link :to="{ name: 'settings' }">
          <md-icon>settings</md-icon>
          <span>Settings</span>
        </router-link>
      </md-list-item>-->

      <!--<md-divider></md-divider>-->

      <!--<md-list-item disabled>
        <router-link :to="{ name: 'feedback' }">
          <md-icon>feedback</md-icon>
          <span>Feedback</span>
        </router-link>
      </md-list-item>-->

      <!--<md-divider></md-divider>-->

      <!-- TODO: remove dev links -->

      <md-list-item>
        <router-link :to="{ name: 'welcome' }">
          <md-icon>code</md-icon>
          <span>Welcome page</span>
        </router-link>
      </md-list-item>

      <md-list-item>
        <router-link :to="{ name: 'devIndexedDB' }">
          <md-icon>code</md-icon>
          <span>IndexedDB</span>
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
  hr
    margin 8px 0
  &__list
    padding 8ppx 0 !important
  .md-sidenav-content
    /*box-shadow none !important*/
    .md-list-item
      .md-ink-ripple
        display none !important
</style>