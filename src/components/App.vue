<template>
  <div id="app">
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/sampleData">Sample Data</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.clearfix {
  clear: both;
}
</style>
