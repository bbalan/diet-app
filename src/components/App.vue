<template>
  <div id="app">

    <toolbar></toolbar>

    <transition name="page-fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import router from 'router'
import store from 'store'
import Toolbar from 'components/Toolbar'

export default {
  components: { Toolbar },
  created() {
    this.setToday()
    this.welcome()
  },
  methods: {
    // Update store.state.calendar.today every 1 min
    setToday() {
      store.commit('calendar/setToday')
      store.commit('calendar/setCurrentDay', store.state.calendar.today)

      setInterval(() => {
        store.commit('calendar/setToday')
      }, 60000)
    },
    welcome() {
      if (!store.state.appSettings.signupComplete) {
        router.replace('/welcome#intro')
      }
    },
  },
}
</script>