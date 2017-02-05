<template>
  <div>
    <h2>Days</h2><pre>{{ days }}</pre>
    <h2>Entries</h2><pre>{{ entries }}</pre>
    <h2>Cache</h2><pre>{{ foodCache }}</pre>
    <button @click="localStorageClear">localStorage.clear()</button>
  </div>
</template>

<script>
export default {
  name: 'LocalStorage',
  computed: {
    days() {
      return JSON.parse(localStorage.getItem('days'))
    },
    entries() {
      return JSON.parse(localStorage.getItem('entries'))
    },
    foodCache() {
      return JSON.parse(localStorage.getItem('foodCache'))
    },
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
</style>