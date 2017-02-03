<template>
  <li>
    <span class="name">{{dataFood.name}}</span> 
    <span class="quantity">{{quantity}} {{dataFood.ru}}</span>
    <span class="calories">{{calories}}</span>

    <!--<pre>{{dataFood}}</pre>-->
  </li>
</template>

<script>
import store from '../../store'
import { USDA, OTHER } from '../../api'

export default {
  props: ['foodUUID', 'quantity'],
  computed: {
    foodFromCache() {
      return store.state.foodCache.food[this.foodUUID]
    },
    dataFood() {
      return this.foodFromCache.dataFood
    },
    calories() {
      let energy = 0

      switch (this.foodFromCache.source) {
        case USDA:
          energy = this.dataFood.nutrients.find(
            nutrient => nutrient.nutrient_id === '208'
          )
          break
        case OTHER:
        default:
          console.error('API not implemented')
          break
      }

      const energyVal = energy.value * (this.quantity / 100)
      return `${energyVal} ${energy.unit}`
    },
  },
}
</script>

<style scoped lang="stylus">
.calories
  font-weight bold
</style>
