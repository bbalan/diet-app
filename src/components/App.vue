<template>
  <div 
    id="app" 
    class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">

    <mdl-header></mdl-header>
    <mdl-drawer></mdl-drawer>

    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>

  </div>
</template>

<script>
import router from 'router'
import paths from 'router/paths'
import store from 'store'
import mdlHeader from 'components/UI/Header'
import mdlDrawer from 'components/UI/Drawer'

export default {
  beforeCreate() {
    // Update store.state.calendar.today every 1 min
    setInterval(() => {
      store.commit('calendar/setToday')
    }, 60000)

    if (!store.state.appSettings.signupComplete) {
      router.replace(paths.Welcome)
    }
  },
  components: { mdlHeader, mdlDrawer },
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
@media only screen and (max-width: 600px) {
  .container {
    width: 100% !important;
  }
}
</style>
