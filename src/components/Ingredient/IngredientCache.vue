<template>
  <div>
    <h1>Ingredient Cache</h1>

    <ingredient-link
      v-for="ingredient in cahce"
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
    cahce: {
      get() {
        return store.state.ingredientCache.ingredients
      },
    },
  },
}
</script>

<style scoped>

</style>
