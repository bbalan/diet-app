<template>
  <div v-if="dataFood" class="nutrition-facts">

    <!-- TODO: macro percentages/gauges -->

    <nutrient 
      v-for="nutrient in nutrientData"
      :nutrient="nutrient"
      :mass="mass"
      :decimals="1"
      :serving="nutrient.serving">
    </nutrient>
  </div>
</template>

<script>
import * as API from 'api'
import Nutrient from './Nutrient'

export default {
  props: ['dataFood', 'source', 'mass'],
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
      if (!this.dataFood) return []

      const data = []

      switch (this.source) {
        case API.USDA:
          this.visibleNutrients.forEach((id) => {
            const nutrientFilter = item => item.nutrient_id === id
            const foundNutrient = this.dataFood.nutrients.filter(nutrientFilter)[0]
            if (foundNutrient) data.push(foundNutrient)
          })
          break
        case API.OTHER:
          break
        case API.CUSTOM:
          data.push({ name: 'calories', decimals: 0, unit: 'kcal', value: this.dataFood.calories, serving: this.dataFood.serving })
          data.push({ name: 'fat', decimals: 0, unit: 'g', value: this.dataFood.fat, serving: this.dataFood.serving })
          data.push({ name: 'carbs', decimals: 0, unit: 'g', value: this.dataFood.carbs, serving: this.dataFood.serving })
          data.push({ name: 'protein', decimals: 0, unit: 'g', value: this.dataFood.protein, serving: this.dataFood.serving })
          break
        default:
          break
      }

      return data
    },
  },
}
</script>

<style lang="stylus">
.nutrition-facts
  margin-top 16px
  position relative
</style>