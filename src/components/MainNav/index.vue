<template>
  <div class="mainNav">
    <div>
      <router-link :to="paths.Root">Home</router-link>
      <router-link :to="paths.Welcome" v-if="true || !signupComplete">Settings</router-link>
      <router-link :to="paths.FoodFind">Add food</router-link>
      <router-link :to="paths.WorkoutFind">Add workout</router-link>
      <router-link :to="paths.Log">Log</router-link>
    </div>
    <nav>Dev: 
      <router-link :to="paths.Cache">Cache</router-link>
      <router-link :to="paths.Entries">Entry List</router-link>
      <router-link :to="paths.LocalStorage">LocalStorage</router-link>
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

<style scoped lang="stylus">
/*h1
  display inline-block
  margin 0 0 0 -10px
  a
    color black !important
nav
  letter-spacing 0
  a
    display inline-block
    padding 10px
    color #42b983
    &:hover
      color black*/
</style>