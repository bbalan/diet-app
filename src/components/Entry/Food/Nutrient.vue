<template>

  <div v-if="nutrient && showNutrient" :class="`nutrient nutrient-id-${id} nutrient-name-${name}`">
    <div class="nutrient__name">{{ name | capitalize }}</div>
    <div class="nutrient__value">
      {{ value }} 
      <span class="nutrient__unit">{{ nutrient.unit }}</span>
    </div>
  </div>

</template>

<script>
import { capitalize } from 'util/filters'

export default {
  filters: { capitalize },
  props: {
    nutrient: {
      Object,
      default() {
        return {}
      },
    },
    decimals: {
      type: Number,
      default: 1,
    },
    mass: {
      type: Number,
    },
  },
  computed: {
    value() {
      const val = this.nutrient.value * (this.mass / 100)
      return Math.floor(val)
    },
    id() {
      return this.nutrient.nutrient_id
    },
    // Rename nutrients from more verbose versions from USDA API
    name() {
      switch (this.id) {
        case '208': return 'Calories'
        case '204': return 'Fat'
        case '606': return 'Saturated Fat'
        case '605': return 'Trans Fat'
        case '205': return 'Carbs'
        case '291': return 'Fiber'
        case '269': return 'Sugar'
        case '307': return 'Sodium'
        default: return this.nutrient.name
      }
    },
    // Only show secondary nutrients if value is not 0
    showNutrient() {
      if (['605', '606', '307'].includes(this.id)) {
        return this.value !== 0
      }
      return true
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  clear both
  padding 8px 0

  &:after
    display block
    content ''
    clear both
  
  &__name
    font-weight bold
    float left
  &__value
    float right

  &-id-208
  &-name-calories
    border-bottom 1px solid #eee
    font-weight normal
    font-size 20px

    .nutrient__name
      font-weight normal

    .nutrient__unit
      /*display none*/

  &-id-606
  &-id-605
    .nutrient__name
      font-weight normal
      padding-left 20px

  &-id-307
    font-weight normal
</style>
