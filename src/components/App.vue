<template>
  <div id="app">

    <toolbar ref="toolbar"></toolbar>

    <transition name="page-fade" mode="out-in">
      <router-view @evtOpenSearch="onOpenSearch"></router-view>
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
    this.setTodayInterval()
    this.redirectToWelcome()
  },
  methods: {
    // Update store.state.calendar.today every 1 min
    setTodayInterval() {
      setInterval(() => store.dispatch('calendar/setToday'), 60000)
    },

    // Redirect to the welcome page on first visit
    redirectToWelcome() {
      if (!store.state.config.signupComplete) {
        router.replace('/welcome#intro')
      }
    },

    // Used by recipes to open the searchBar on ingredient add
    onOpenSearch() { this.$refs.toolbar.openSearch() },
  },
}
</script>