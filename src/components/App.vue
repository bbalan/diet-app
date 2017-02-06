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

// TODO: signup for a USDA API key on app launch
export default {
  data() {
    return {
      todayInterval: null,
    }
  },
  beforeCreate() {
    // Update store.state.days.today every 1 min
    this.todayInterval = setInterval(() => {
      store.commit('days/setToday')
    }, 60000)

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
