<template>
  <div>
    <h1>Ingredient Cache</h1>
    <button @click="clearCache">Clear cache</button>

    <ingredient-link
      v-for="ingredient in cache"
      :id="ingredient.id"
      :source="ingredient.source">
      {{ ingredient.dataFood.name }}
    </ingredient-link>
    
    <!--<pre>{{ cahce }}</pre>-->
  </div>
</template>

<script>
import store from '../../store'
import IngredientLink from './IngredientLink'

export default {
  name: 'Ingredients',
  components: { IngredientLink },
  computed: {
    cache: {
      get() {
        return store.state.ingredientCache.ingredients
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
