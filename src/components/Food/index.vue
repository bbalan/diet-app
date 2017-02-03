<template>
  <div class="food" v-if="dataFood">
    <h2>{{ dataFood.name }}</h2>

    <form @submit.prevent>
      <label for="quantity">Quantity:</label>
      <input type="number" name="quantity" v-model.number="quantity">
      <span class="quantity__unit">grams</span>
    </form>

    <nutrient 
      v-for="nutrientID in visibleNutrients"
      v-if="findNutrient(nutrientID)"
      :nutrient="findNutrient(nutrientID)"
      :parentMass="parentMass"
      :decimals="1">
    </nutrient>

    <p class="dataSource">Source: {{ source }}</p>

    <button @click="onEat">Eat</button>

  </div>
</template>

<script>
// TODO: split API get functions into a FoodSummary component
import uuid from 'uuid'
import store from '../../store'
import * as API from '../../api'
import * as USDA from '../../api/USDA'
import * as OTHER from '../../api/other'
import { checkStatus, parseJSON } from '../../api/util'
import Nutrient from './Nutrient'

export default {
  name: 'Food',
  props: ['id', 'source'],
  components: { Nutrient },
  data() {
    return {
      quantity: 100, // TODO: offer more units (oz, cups, ml, ...)
      dataFood: null,
    }
  },
  created() {
    this.getData()
  },
  watch: {
    $route: 'getData', // if route changes, re-hydrate component
  },
  methods: {
    // User pressed the Eat button
    onEat() {
      let foodUUID
      const entryUUID = uuid.v4()
      const existing = Object
        .entries(store.state.foodCache.food)
        .find(food =>
          food[1].id === this.id && food[1].source === this.source
        )

      if (!existing) {
        foodUUID = uuid.v4()
        store.commit('foodCache/addFood', {
          foodUUID,
          id: this.id,
          source: this.source,
          quantity: this.quantity,
          dataFood: this.dataFood,
        })
      } else {
        foodUUID = existing[0]
      }

      store.commit('log/addEntry', {
        entryUUID,
        foodUUID,
        quantity: this.quantity,
      })
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

    // Determine if food is already in cache. If not, hit the API
    getData() {
      const foodCache = store.state.foodCache.food
      const existing = Object
        .entries(foodCache)
        .find(food =>
          food[1].id === this.id && food[1].source === this.source
        )

      if (existing) {
        this.dataFood = existing[1].dataFood
      } else {
        this.getDataFromAPI()
      }
    },

    // Hit the source API for food data
    getDataFromAPI() {
      let foodReportAPI // composed URL of food API
      let reportHandler // do API-specific things with returned data

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

      // Figure out which API URLs and handlers to use
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
          return // invalid source
      }

      // do the search
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
    parentMass() {
      if (typeof this.quantity !== 'number') return 0
      return this.quantity
    },
  },
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
