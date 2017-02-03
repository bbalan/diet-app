<template>
  <div>
    <h1>Food Cache</h1>

    <search-result
      v-for="food in cache"
      :id="food.id"
      :source="food.source"
      :name="food.dataFood.name">
    </search-result>
    
  </div>
</template>

<script>
import store from '../../store'
import SearchResult from '../Search/SearchResult'

export default {
  name: 'FoodCache',
  components: { SearchResult },
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
