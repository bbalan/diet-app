<template>
  <div id="Splash">
    <slide>
      <h1 id="title">Zombocom</h1>
      
      <p>
        You can do anything here. The only limit is yourself.
      </p>

      <router-link :to="routes.Settings" class="splash__signup">
        Get Started
      </router-link>
    </slide>

    <router-view></router-view>
  </div>
</template>

<script>
import routes from 'router/routes'
import Slide from '../Slide'

export default {
  name: 'Splash',
  data() {
    return { routes }
  },
  components: {
    slide: Slide,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
