<template>
  <div class="ingredient" v-if="dataFood !== null">
    <h2>{{ dataFood.name }}</h2>

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
import store from '../../store'
import * as API from '../../api'
import * as USDA from '../../api/USDA'
import * as OTHER from '../../api/other'
import { checkStatus, parseJSON } from '../../api/util'
import Nutrient from './Nutrient'

export default {
  name: 'ingredient',
  props: ['id', 'source'],
  components: { Nutrient },
  data() {
    return {
      // TODO: offer more units of quantity (oz, cups, etc)
      quantity: 100,
      dataFood: null,
    }
  },
  beforeMount() {
    const ingredients = store.state.ingredientCache.ingredients
    const finder = this.findIngredientInCache(this.id, this.source)
    const existing = ingredients.find(finder)

    if (existing !== undefined) {
      this.dataFood = existing.dataFood
    } else {
      this.getDataFromAPI()
    }
  },
  methods: {
    // User pressed the Eat button
    onEat() {
      const data = {
        id: this.id,
        source: this.source,
        dataFood: this.dataFood,
      }

      store.commit('ingredientCache/addIngredient', data)
    },

    // Get nutrient by USDA nutrient ID
    findNutrient(id) {
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

    // Array.find() function to identify ingredient in cache
    findIngredientInCache(id, source) {
      return function finder(item) {
        return item.id === id && item.source === source
      }
    },

    // Hit the source API for ingredient data
    getDataFromAPI() {
      let foodReportAPI
      let reportHandler

      // Append source to the selected item
      function usdaReportHandler(json) {
        try {
          this.dataFood = json.report.food
        } catch (e) {
          console.error('Food report failed - ', e)
        }
      }

      function otherReportHandler(json) {
        console.error('Not implemented - reportHandler()', json)
      }

      switch (this.source) {
        case API.USDA:
          foodReportAPI = USDA.foodReport(this.id)
          reportHandler = usdaReportHandler.bind(this)
          break
        case API.OTHER:
          foodReportAPI = OTHER.foodReport(this.id)
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
  },
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
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
