<template>
  <div id="app">
    <main-nav></main-nav>

    <transition name="page-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import router from 'router'
import store from 'store'
import MainNav from 'components/MainNav'

export default {
  components: { MainNav },
  beforeCreate() {
    // Update store.state.calendar.today every 1 min
    store.commit('calendar/setToday')
    setInterval(() => {
      store.commit('calendar/setToday')
    }, 60000)

    if (!store.state.appSettings.signupComplete) {
      router.replace('/welcome#intro')
    }

    store.commit('calendar/setCurrentDay', store.state.calendar.today)
  },
}
</script>