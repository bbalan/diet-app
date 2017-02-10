<template>
  <div class="mdl-layout__drawer" @click="closeDrawer">
    <!--<span class="mdl-layout-title">Diet App</span>-->
    <nav class="mdl-navigation">
      <router-link 
        class="mdl-navigation__link link--bold" 
        :to="paths.Log">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">assignment</i>
        </label>
        Log
      </router-link>
      <router-link 
        class="mdl-navigation__link link--bold" 
        :to="paths.FoodFind">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">restaurant</i>
        </label>
        Add food
      </router-link>
      <router-link 
        class="mdl-navigation__link link--bold" 
        :to="paths.WorkoutFind">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">fitness_center</i>
        </label>
        Add workout
      </router-link>
      <hr>
      <router-link 
        class="mdl-navigation__link link--bold" 
        :to="paths.Welcome" v-if="true || !signupComplete">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">settings</i>
        </label>
        Settings
      </router-link>
      <hr>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Cache">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons"></i>
        </label>
        Cache
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Entries">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons"></i>
        </label>
        Entry List
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.LocalStorage">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons"></i>
        </label>
        LocalStorage
      </router-link>
    </nav>
  </div>
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
  },
  methods: {
    closeDrawer() {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
    },
  },
}
</script>

<style scoped lang="stylus">
.mdl-layout__drawer
  background white
  
  .mdl-navigation

    .mdl-navigation__link
      color black

      &.link--bold
        font-weight bold
</style>