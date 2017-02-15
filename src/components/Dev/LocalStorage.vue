<template>
  <div class="grid__outer">
    <md-button  @click.native="localStorageClear"class="md-raised md-accent ls-clear icon-left">
      <md-icon>warning</md-icon>
      localStorage.clear()
    </md-button>
    <h2>userInfo</h2><pre>{{ userInfo }}</pre>
    <h2>appSettings</h2><pre>{{ appSettings }}</pre>
    <h2>calendar</h2><pre>{{ calendar }}</pre>
    <h2>entries</h2><pre>{{ entries }}</pre>
    <h2>foodCache</h2><pre>{{ foodCache }}</pre>
    <h2>workoutPresets</h2><pre>{{ workoutPresets }}</pre>
    <h2>search</h2><pre>{{ search }}</pre>
  </div>
</template>

<script>
import store from 'store'

export default {
  name: 'LocalStorage',
  computed: {
    userInfo() { return JSON.parse(localStorage.getItem('userInfo')) },
    appSettings() { return JSON.parse(localStorage.getItem('appSettings')) },
    calendar() { return JSON.parse(localStorage.getItem('calendar')) },
    entries() { return JSON.parse(localStorage.getItem('entries')) },
    foodCache() { return JSON.parse(localStorage.getItem('foodCache')) },
    workoutPresets() { return JSON.parse(localStorage.getItem('workoutPresets')) },
    search() { return store.state.search },
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
.ls-clear
  margin-left 0
</style>