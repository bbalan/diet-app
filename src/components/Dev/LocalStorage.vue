<template>
  <div>
    <button @click="localStorageClear">localStorage.clear()</button>
    <h2>userInfo</h2><pre>{{ userInfo }}</pre>
    <h2>calendar</h2><pre>{{ calendar }}</pre>
    <h2>entries</h2><pre>{{ entries }}</pre>
    <h2>foodCache</h2><pre>{{ foodCache }}</pre>
    <h2>workoutPresets</h2><pre>{{ workoutPresets }}</pre>
  </div>
</template>

<script>
export default {
  name: 'LocalStorage',
  computed: {
    userInfo() { return JSON.parse(localStorage.getItem('userInfo')) },
    calendar() { return JSON.parse(localStorage.getItem('calendar')) },
    entries() { return JSON.parse(localStorage.getItem('entries')) },
    foodCache() { return JSON.parse(localStorage.getItem('foodCache')) },
    workoutPresets() { return JSON.parse(localStorage.getItem('workoutPresets')) },
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
button
  font-size 20px
  font-weight bold
  background red
  color white
  border-color maroon
  border-radius 10px
  outline none
</style>