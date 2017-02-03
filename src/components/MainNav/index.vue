<template>
  <nav>
    <h1>Diet app</h1>
    <router-link :to="routes.Root">Home</router-link>
    <router-link :to="routes.Signup" v-if="!signupComplete">Sign Up</router-link>
    <router-link :to="routes.FoodSearch">Search</router-link>
    <router-link :to="routes.FoodCache">Cache</router-link>
    <router-link :to="routes.FoodLog">Log</router-link>
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