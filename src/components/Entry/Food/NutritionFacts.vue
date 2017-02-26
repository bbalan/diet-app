<template>
  <div v-if="dataFood" class="nutrition-facts">

    <!-- TODO: macro percentages/gauges -->

    <nutrient 
      v-for="nutrient in nutrientData"
      :nutrient="nutrient"
      :mass="mass"
      :decimals="1">
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

      if (this.source === API.USDA) {
        this.visibleNutrients.forEach((id) => {
          let nutrientFilter

          switch (this.source) {
            case API.USDA:
              nutrientFilter = item => (item.nutrient_id === id)
              break
            case API.OTHER: break
            case 'custom':
            default:
              break
          }

          const foundNutrient = this.dataFood.nutrients.filter(nutrientFilter)[0]

          if (foundNutrient) data.push(foundNutrient)
        })
      }

      if (this.source === 'custom') {
        data.push({ name: 'calories', decimals: 0, unit: 'kcal', value: this.dataFood.calories })
        data.push({ name: 'fat', decimals: 0, unit: 'g', value: this.dataFood.fat })
        data.push({ name: 'carbs', decimals: 0, unit: 'g', value: this.dataFood.carbs })
        data.push({ name: 'protein', decimals: 0, unit: 'g', value: this.dataFood.protein })
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