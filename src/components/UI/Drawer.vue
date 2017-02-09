<template>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Diet App</span>
    <nav class="mdl-navigation">
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Root">
        Home
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Settings" v-if="true || !signupComplete">
        Settings
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.FoodFind">
        Add food
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.WorkoutFind">
        Add workout
      </router-link>
      <router-link 
        class="mdl-navigation__link" 
        :to="paths.Log">
        Log
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
}
</script>
