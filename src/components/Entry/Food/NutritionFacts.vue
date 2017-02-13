<template>
  <md-card v-if="dataFood" class="nutrition-facts">
    <nutrient 
      v-for="nutrient in nutrientData"
      :nutrient="nutrient"
      :mass="mass"
      :decimals="1">
    </nutrient>
  </md-card>
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
      const data = []

      if (!this.dataFood) return data

      this.visibleNutrients.forEach((id) => {
        let nutrientFilter

        switch (this.source) {
          case API.USDA:
            nutrientFilter = item => (item.nutrient_id === id)
            break
          case API.OTHER:
          default:
            break
        }

        const foundNutrient = this.dataFood.nutrients.filter(nutrientFilter)[0]

        if (foundNutrient) data.push(foundNutrient)
      })

      return data
    },
  },
}
</script>

<style lang="stylus">
.nutrition-facts
  padding 0 0 8px 0
  margin-bottom 16px
</style>