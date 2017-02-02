<template>
  <nav>
    <h1>Diet app</h1>
    <router-link :to="routes.root">Home</router-link>
    <router-link :to="routes.signup" v-if="!signupComplete">Sign Up</router-link>
    <router-link :to="routes.foodSearch">Food Search</router-link>
    <router-link :to="routes.foodCache">Food Cache</router-link>
    <router-link :to="routes.dailyLog">Daily Log</router-link>
  </nav>
</template>

<script>
import store from '../../store'
import Routes from '../../router/Routes'

export default {
  computed: {
    routes() {
      return Routes
    },
    signupComplete() {
      return store.state.userInfo.signupComplete
    },
  },
}
</script>

<style scoped lang="stylus">
</style>