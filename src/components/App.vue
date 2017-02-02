<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import router from '../router'
import store from '../store'
import MainNav from './MainNav'

// TODO: signup for a USDA API key on app launch
export default {
  beforeCreate() {
    if (!store.state.userInfo.signupComplete) {
      // TODO: replace this with daily food log
      // router.replace('/signup')
    }
  },
  components: { MainNav },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.clearfix {
  clear: both;
}
</style>
