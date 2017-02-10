<template>
  <div class="mdl-layout__drawer" @click="closeDrawer">
    <!--<span class="mdl-layout-title">Diet App</span>-->
    <nav class="mdl-navigation">
      <router-link 
        id="drawer-link-home"
        class="mdl-navigation__link" 
        :to="paths.Root">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">home</i>
        </label>
        Home
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.FoodFind">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">restaurant_menu</i>
        </label>
        Add food
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.WorkoutFind">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">directions_bike</i>
        </label>
        Add workout
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Log">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="drawer-link-home">
          <i class="material-icons">description</i>
        </label>
        Log
      </router-link>
      <hr>
      <router-link 
        class="mdl-navigation__link" 
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
        Cache
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Entries">
        Entry List
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.LocalStorage">
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
      font-weight bold
      color black
</style>