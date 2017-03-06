<template>
  <div class="nutrition-facts">

    <!-- TODO: macro percentages/gauges -->

    <nutrient
      v-for="nutrient in nutrientData"
      :nutrient="nutrient"
      :massFromUser="massFromUser"
      :massFromData="massFromData"
      :decimals="1">
    </nutrient>

    <!--<pre>{{ nutrientData }}</pre>-->

    <p class="md-caption" v-if="isSourceVisible">Source: {{ source }}</p>
  </div>
</template>

<script>
import { USDA, CUSTOM, RECIPE } from 'api'
import Nutrient from 'components/Views/Nutrient'

export default {
  props: ['dataFood', 'source', 'massFromData', 'massFromUser'],
  components: { Nutrient },
  computed: {
    // Is a user-submitted (custom) food
    isCustom() { return this.source === CUSTOM },

    // Process nutrients into a format usable by <nutrition-facts>
    nutrients() {
      if (this.isCustom) {
        return {
          calories: this.dataFood.calories,
          fat: this.dataFood.fat,
          fat_saturated: this.dataFood.fat_saturated,
          fat_trans: this.dataFood.fat_trans,
          carbs: this.dataFood.carbs,
          sugar: this.dataFood.sugar,
          fiber: this.dataFood.fiber,
          protein: this.dataFood.protein,
        }
      }

      return this.dataFood.nutrients
    },

    // Which (USDA) nutrients to show. All others are ignored
    visibleNutrients() {
      switch (this.source) {
        case USDA:
          return ['208', '204', '606', '605', '205', '291', '203', '269'/* '307' */]
        default: return []
      }
    },

    // Get nutrient data from food data
    nutrientData() {
      const data = []

      switch (this.source) {
        case USDA:
          this.visibleNutrients.forEach((id) => {
            const nutrientFilter = item => item.nutrient_id === id
            const foundNutrient = this.nutrients.filter(nutrientFilter)[0]
            if (foundNutrient) data.push(foundNutrient)
          })
          break
        case CUSTOM:
          data.push({ name: 'calories', decimals: 0, unit: 'kcal', value: this.nutrients.calories, massFromData: this.massFromData })
          data.push({ name: 'fat', decimals: 0, unit: 'g', value: this.nutrients.fat, massFromData: this.massFromData })
          data.push({ name: 'carbs', decimals: 0, unit: 'g', value: this.nutrients.carbs, massFromData: this.massFromData })
          data.push({ name: 'protein', decimals: 0, unit: 'g', value: this.nutrients.protein, massFromData: this.massFromData })
          break
        default:
          break
      }

      return data
    },

    isSourceVisible() {
      return this.source && ![CUSTOM, RECIPE].includes(this.source)
    },
  },
}
</script>

<style lang="stylus">
.nutrition-facts
  margin-top 16px
  position relative
</style>