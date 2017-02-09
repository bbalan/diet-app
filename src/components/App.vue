<template>
  <div id="app">
    <main-nav></main-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import router from 'router'
import paths from 'router/paths'
import store from 'store'
import MainNav from 'components/MainNav'

export default {
  beforeCreate() {
    // Update store.state.calendar.today every 1 min
    setInterval(() => {
      store.commit('calendar/setToday')
    }, 60000)

    if (!store.state.appSettings.signupComplete) {
      router.replace(paths.Settings)
    }
  },
  components: { MainNav },
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
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
