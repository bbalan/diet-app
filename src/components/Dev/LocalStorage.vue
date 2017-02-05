<template>
  <div>
    <pre>{{ log }}</pre>
    <pre>{{ foodCache }}</pre>
    <button @click="localStorageClear">localStorage.clear()</button>
  </div>
</template>

<script>
export default {
  name: 'LocalStorage',
  computed: {
    log() {
      const log = localStorage.getItem('log')
      return JSON.parse(log)
    },
    foodCache() {
      const cache = localStorage.getItem('foodCache')
      return JSON.parse(cache)
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