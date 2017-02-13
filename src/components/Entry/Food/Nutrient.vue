<template>

  <md-table-row v-if="nutrient" :class="`nutrient-id-${id}`">
    <md-table-cell class="nutrient-name">{{ name }}</md-table-cell>
    <md-table-cell md-numeric>{{ value }} {{ nutrient.unit }}</md-table-cell>
  </md-table-row>

</template>

<script>
export default {
  props: {
    nutrient: Object,
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
  },
}
</script>

<style scoped lang="stylus">
.nutrient-name
  font-weight bold

.nutrient-id-208
  background #eee
  .md-table-cell
    /*color white !important*/

.nutrient-id-606
.nutrient-id-605
  font-weight normal
  padding-left 20px !important

.nutrient-id-307
  font-weight normal
</style>
