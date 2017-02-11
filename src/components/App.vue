<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from 'router'
import paths from 'router/paths'
import store from 'store'
import mdlHeader from 'components/UI/Header'
import mdlDrawer from 'components/UI/Drawer'

export default {
  components: { mdlHeader, mdlDrawer },
  beforeCreate() {
    // Update store.state.calendar.today every 1 min
    setInterval(() => {
      store.commit('calendar/setToday')
    }, 60000)

    if (!store.state.appSettings.signupComplete) {
      router.replace(paths.Welcome)
    }
  },
}
</script>

<style scoped lang="stylus">
#app
  width 100%
  height 100%
  position relative
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.clearfix
  clear: both

h2
  font-size: 20px

a
  color: #42b983
  text-decoration: none

@media only screen and (max-width: 600px)
  .container
    width: 100% !important

</style>
