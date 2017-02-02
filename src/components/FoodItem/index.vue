<template>
  <div class="foodItem" v-if="foodData !== null">
    <h2>{{ foodData.name }}</h2>

    <form>
      <label for="quantity">Quantity:</label>
      <input type="number" name="quantity" v-model="quantity">
      <span class="quantity__unit">grams</span>
    </form>

    <nutrient 
      v-for="nutrientID in visibleNutrients"
      v-if="findNutrient(nutrientID)"
      :nutrient="findNutrient(nutrientID)"
      :parentMass="quantity"
      :decimals="1">
    </nutrient>

    <p class="dataSource">Source: {{ source }}</p>

    <button @click="onEat">Eat</button>

  </div>
</template>

<script>
import { USDA, OTHER } from '../../api'
import { checkStatus, parseJSON } from '../../api/util'
import { usdaFoodReport } from '../../api/USDA'
import { otherFoodReport } from '../../api/other'

import Nutrient from './Nutrient'

export default {
  name: 'FoodItem',
  props: ['id', 'source'],
  components: { Nutrient },
  data() {
    return {
      // TODO: offer more units of quantity (oz, cups, etc)
      quantity: 100,
      foodData: null,
    }
  },
  // Hit the source API for ingredient data
  beforeMount() {
    let foodReportAPI
    let reportHandler

    // Append source to the selected item
    function usdaReportHandler(json) {
      try {
        this.foodData = json.report.food
      } catch (e) {
        console.error('Food report failed - ', e)
      }
    }

    function otherReportHandler(json) {
      console.error('Not implemented - reportHandler()', json)
    }

    switch (this.source) {
      case USDA:
        foodReportAPI = usdaFoodReport(this.id)
        reportHandler = usdaReportHandler.bind(this)
        break
      case OTHER:
        foodReportAPI = otherFoodReport(this.id)
        reportHandler = otherReportHandler.bind(this)
        break
      default:
        return
    }

    fetch(foodReportAPI)
    .then(checkStatus)
    .then(parseJSON)
    .then(reportHandler)
    .catch((error) => { console.error('Food report failed', error) })

    return
  },
  computed: {
    visibleNutrients() {
      switch (this.source) {
        case 'USDA':
          return ['208', '204', '205', '291', '203', '269', '307']
          // '606', '605' == saturated, trans fat
        default: return []
      }
    },
  },
  methods: {
    onEat() {
      console.log('Ate', this.foodData.name)
    },
    // Get nutrient by USDA nutrient ID
    findNutrient(id) {
      let nutrientFilter

      switch (this.source) {
        case USDA:
          nutrientFilter = item => (item.nutrient_id === id)
          break
        case OTHER:
        default:
          return []
      }

      return this.foodData.nutrients.filter(nutrientFilter)[0]
    },
  },
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
