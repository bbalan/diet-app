<template>
  <div class="nutrientList__item" v-if="nutrient">

    <div class="nutrientList__item__name">
      {{ name }}
    </div>
    <div class="nutrientList__item__val">
      {{ value }} {{ nutrient.unit }}
    </div>
    <div class="clearfix"></div>

  </div>
</template>

<script>
import { roundTo } from 'util'

export default {
  props: {
    nutrient: Object,
    decimals: {
      type: Number,
      default: 10,
    },
    mass: {
      type: Number,
    },
  },
  computed: {
    value() {
      const val = this.nutrient.value * (this.mass / 100)
      return roundTo(val, 1) // TODO: add support for custom decimals
    },
    // Rename nutrients from more verbose versions from USDA API
    name() {
      switch (this.nutrient.nutrient_id) {
        case '208': return 'Calories'
        case '204': return 'Fat'
        case '606': return 'Saturated Fat'
        case '605': return 'Trans Fat'
        case '205': return 'Carbs'
        case '291': return 'Fiber'
        case '269': return 'Sugar'
        default: return this.nutrient.name
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrientList__item
  width 200px
  clear both
  background white

  &:hover
    background #eee

  &__name
    font-weight bold
    float left
    width 60%

  &__name
  &__val
    /*display inline*/

  &__val
    width 40%
    float right
    text-align right

label[for="mass"]
  font-weight bold
</style>
