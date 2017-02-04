<template>
  <div>
    <h1>*DEV* Food Cache</h1>

    <food-link
      v-for="food in cache"
      :id="food.id"
      :source="food.source"
      :name="food.dataFood.name">
    </food-link>
    
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
}
</script>

<style scoped>

</style>
