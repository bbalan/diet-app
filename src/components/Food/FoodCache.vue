<template>
  <div>
    <h1>Food Cache</h1>
    <button @click="clearCache">Clear cache</button>

    <food-link
      v-for="food in cache"
      :id="food.id"
      :source="food.source">
      {{ food.dataFood.name }}
    </food-link>
    
    <!--<pre>{{ cahce }}</pre>-->
  </div>
</template>

<script>
import store from '../../store'
import FoodLink from './FoodLink'

export default {
  name: 'FoodCache',
  components: { FoodLink },
  computed: {
    cache: {
      get() {
        return store.state.foodCache.food
      },
    },
  },
  methods: {
    clearCache() {
      localStorage.clear()
      window.location.reload()
    },
  },
}
</script>

<style scoped>

</style>
