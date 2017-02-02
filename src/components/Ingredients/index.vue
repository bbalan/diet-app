<template>
  <div>
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
        return store.state.ingredients.history
      },
    },
  },
}
</script>

<style scoped>

</style>
