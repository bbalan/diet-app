<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import router from 'router'
import store from 'store'
import MainNav from 'components/MainNav'
import dateFormat from 'dateformat'

// TODO: signup for a USDA API key on app launch
export default {
  beforeCreate() {
    const today = dateFormat(new Date(), 'mm-dd-yy')
    store.commit('days/setToday', today)
    if (!store.state.appSettings.signupComplete) {
      // router.replace('/signup') // TODO: rename this to "welcome"
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
h2 {
  font-size: 20px;
}
a {
  color: #42b983;
  text-decoration: none;
}
a:hover,
a:visited {
  color: black;
}
</style>
