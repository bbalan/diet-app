<template>
  <div v-if="nutrients.length" class="nutrition-facts">

    <!-- TODO: macro percentages/gauges -->

    <nutrient
      v-for="nutrient in nutrientData"
      :nutrient="nutrient"
      :mass="serving"
      :decimals="1"
      :serving="nutrient.serving">
    </nutrient>

    <p class="md-caption" v-if="showSource">Source: {{ source }}</p>
  </div>
</template>

<script>
import * as API from 'api'
import Nutrient from 'components/Views/Nutrient'

export default {
  props: ['nutrients', 'source', 'serving'],
  components: { Nutrient },
  computed: {
    // Which (USDA) nutrients to show. All others are ignored
    visibleNutrients() {
      switch (this.source) {
        case API.USDA:
          return ['208', '204', '606', '605', '205', '291', '203', '269'/* '307' */]
        default: return []
      }
    },

    // Get nutrient data from food data
    nutrientData() {
      const data = []

      switch (this.source) {
        case API.USDA:
          this.visibleNutrients.forEach((id) => {
            const nutrientFilter = item => item.nutrient_id === id
            const foundNutrient = this.nutrients.filter(nutrientFilter)[0]
            if (foundNutrient) data.push(foundNutrient)
          })
          break
        case API.OTHER:
          break
        case API.CUSTOM:
          data.push({ name: 'calories', decimals: 0, unit: 'kcal', value: this.nutrients.calories, serving: this.serving })
          data.push({ name: 'fat', decimals: 0, unit: 'g', value: this.nutrients.fat, serving: this.serving })
          data.push({ name: 'carbs', decimals: 0, unit: 'g', value: this.nutrients.carbs, serving: this.serving })
          data.push({ name: 'protein', decimals: 0, unit: 'g', value: this.nutrients.protein, serving: this.serving })
          break
        default:
          break
      }

      return data
    },
    showSource() {
      return this.source && ![API.CUSTOM, API.RECIPE].includes(this.source)
    },
  },
}
</script>

<style lang="stylus">
.nutrition-facts
  margin-top 16px
  position relative
</style>