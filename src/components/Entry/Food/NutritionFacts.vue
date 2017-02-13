<template>
  <md-card class="nutrition-facts">

    <md-table>
      <!--<md-table-header>
        <md-table-row>
          <md-table-head>Nutrient</md-table-head>
          <md-table-head md-numeric>Amount</md-table-head>
        </md-table-row>
      </md-table-header>-->

      <md-table-body>
        <nutrient 
          v-for="nutrientID in visibleNutrients"
          v-if="getNutrient(nutrientID)"
          :nutrient="getNutrient(nutrientID)"
          :mass="mass"
          :decimals="1">
        </nutrient>
      </md-table-body>
    </md-table>
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

<style lang="stylus">
.nutrition-facts
  padding 0 0 16px 0
  .md-table-row:first-child
    padding-bottom 16px !important
    height 48px
    border-bottom 1px solid #eee !important
  .md-table tbody .md-table-row
    border none
    .md-table-cell
      height 36px !important
</style>