<template>
  <div class="NutritionFacts">

    <!--<h2>{{ dataFood.name }}</h2>-->

    <nutrient 
      v-for="nutrientID in visibleNutrients"
      v-if="getNutrient(nutrientID)"
      :nutrient="getNutrient(nutrientID)"
      :mass="mass"
      :decimals="1">
    </nutrient>

    <p v-if="source" class="dataSource">Source: {{ source }}</p>
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
          return ['208', '204', '606', '605', '205', '291', '203', '269', '307']
        default: return []
      }
    },
  },
  methods: {
    // Get nutrient by USDA nutrient ID
    getNutrient(id) {
      let nutrientFilter

      switch (this.source) {
        case API.USDA:
          nutrientFilter = item => (item.nutrient_id === id)
          break
        case API.OTHER:
        default:
          return []
      }

      return this.dataFood.nutrients.filter(nutrientFilter)[0]
    },
  },
}
</script>