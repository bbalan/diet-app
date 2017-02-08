<template>
  <div>
    <button @click="localStorageClear">localStorage.clear()</button>
    <h2>userInfo</h2><pre>{{ userInfo }}</pre>
    <h2>days</h2><pre>{{ days }}</pre>
    <h2>entries</h2><pre>{{ entries }}</pre>
    <h2>foodCache</h2><pre>{{ foodCache }}</pre>
    <h2>workoutCache</h2><pre>{{ workoutCache }}</pre>
  </div>
</template>

<script>
export default {
  name: 'LocalStorage',
  computed: {
    userInfo() { return JSON.parse(localStorage.getItem('userInfo')) },
    days() { return JSON.parse(localStorage.getItem('days')) },
    entries() { return JSON.parse(localStorage.getItem('entries')) },
    foodCache() { return JSON.parse(localStorage.getItem('foodCache')) },
    workoutCache() { return JSON.parse(localStorage.getItem('workoutCache')) },
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