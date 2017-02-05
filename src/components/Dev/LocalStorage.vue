<template>
  <div>
    <pre>{{ days }}</pre>
    <pre>{{ log }}</pre>
    <pre>{{ foodCache }}</pre>
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
    log() {
      return JSON.parse(localStorage.getItem('log'))
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