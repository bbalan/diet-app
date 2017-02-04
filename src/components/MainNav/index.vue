<template>
  <div class="mainNav">
    <nav>
      <h1><router-link :to="routes.Root">Diet app</router-link></h1>
      <router-link :to="routes.Signup" v-if="!signupComplete">Sign Up</router-link><router-link :to="routes.Search">Search</router-link><router-link :to="routes.Log">Log</router-link>
    </nav>
    <nav>Dev: 
      <router-link :to="routes.Cache">Cache</router-link><router-link :to="routes.DevEntries">Entry List</router-link><button @click="localStorageClear">localStorage.clear()</button>
    </nav>
    <nav>Foods:
      <router-link to="/food/USDA/09503">Apples</router-link><router-link to="/food/USDA/42131">Milk</router-link><router-link to="/food/USDA/09202">Orange</router-link>
    </nav>
  </div>
</template>

<script>
import store from '../../store'
import routes from '../../router/routes'

export default {
  data() {
    return {
      routes,
    }
  },
  computed: {
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
h1
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
      color black
</style>