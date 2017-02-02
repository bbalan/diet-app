<template>
  <div>
    <h1>Ingredient history</h1>

    <ingredient-link
      v-for="ingredient in history"
      :id="ingredient.id"
      :source="ingredient.source">
      {{ ingredient.dataFood.name }}
    </ingredient-link>
    
    <!--<pre>{{ history }}</pre>-->
  </div>
</template>

<script>
import store from '../../store'
import IngredientLink from './IngredientLink'

export default {
  name: 'Ingredients',
  components: { IngredientLink },
  computed: {
    history: {
      get() {
        const h = store.state.ingredientHistory.ingredients
        const newH = []

        h.forEach(item => newH.unshift(item))

        return newH
      },
    },
  },
}
</script>

<style scoped>

</style>
