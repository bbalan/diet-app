<template>
  <div class="nutrientList__item" v-if="nutrient !== null">

    <!--<pre>{{ nutrient }}</pre>-->

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

export default {
  props: {
    nutrient: null,
    decimals: {
      type: Number,
      default: 10,
    },
    parentMass: {
      type: Number,
    },
  },
  computed: {
    value() {
      const val = this.nutrient.value * (this.parentMass / 100)
      return Math.floor(val * this.decimals) / this.decimals
    },
    // Rename ingredients from more verbose versions from USDA API
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
  width 150px
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

label[for="parentMass"]
  font-weight bold
</style>
