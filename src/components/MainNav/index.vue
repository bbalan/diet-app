<template>
  <nav>
    <h1>Diet app</h1>
    <router-link :to="routes.Root">Home</router-link>
    <router-link :to="routes.Signup" v-if="!signupComplete">Sign Up</router-link>
    <router-link :to="routes.Search">Search</router-link>
    <router-link :to="routes.Log">Log</router-link>

    <span> ----- </span>

    <router-link :to="routes.Cache">Cache</router-link>
    <router-link :to="routes.EntryList">Entry List</router-link>
    <router-link to="/food/USDA/09503">Apples</router-link>
    <router-link to="/food/USDA/42131">Milk</router-link>

    <span> ----- </span>

    <button @click="localStorageClear">localStorage.clear()</button>
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
  methods: {
    localStorageClear() {
      localStorage.clear()
      window.location.reload()
    },
  },
}
</script>

<style scoped lang="stylus">
</style>