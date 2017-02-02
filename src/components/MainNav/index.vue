<template>
  <nav>
    <router-link :to="routes.root">Home</router-link>
    <router-link v-if="!signupComplete" :to="routes.signup">Sign Up</router-link>
    <router-link :to="routes.foodSearch">Food Search</router-link>
    <router-link :to="routes.ingredientHistory">Ingredient History</router-link>
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