<template>
  <div class="food" v-if="dataFood">

    <!--<pre>{{ dataFood }}</pre>-->

    <form @submit.prevent="onSubmit">
      <label for="mass">Weight:</label>
      <input type="number" name="mass" v-model.number="mass">
      <span class="mass__unit">grams</span>

      <food-display 
        :dataFood="dataFood" 
        :source="source || entrySource"
        :mass="normalizedMass">
      </food-display>

      <button v-if="!entryUUID" type="submit">Eat</button>
      <button v-else type="submit">Save</button>
    </form>
    
  </div>
</template>

<script>
import uuid from 'uuid'
import store from '../../store'
import * as API from '../../api'
import * as USDA from '../../api/USDA'
import * as OTHER from '../../api/other'
import { checkStatus, parseJSON } from '../../api/util'

import FoodDisplay from './FoodDisplay'

export default {
  name: 'Food',
  props: ['id', 'source', 'entryUUID'],
  components: { FoodDisplay },
  data() {
    return {
      mass: 100, // TODO: offer more units (oz, cups, ml, ...)
      dataFood: null,
      entrySource: null,
    }
  },
  created() {
    if (this.entryUUID) {
      this.getDataFromEntry()
    } else {
      this.getDataFromCache()
    }
  },
  watch: {
    $route: 'getData', // if route changes, re-hydrate component
  },
  computed: {
    normalizedMass() {
      if (typeof this.mass !== 'number') return 0
      return this.mass
    },
  },
  methods: {
    // User pressed the Eat button
    onSubmit() {
      if (this.entry) {
        this.saveEntry()
      } else {
        this.addEntry()
      }
    },

    saveEntry() {
      // TODO: make this a thing
      store.commit('log/saveEntry', {
        entryUUID: this.entry,
        mass: this.mass,
      })
    },

    // Commit new log entry
    addEntry() {
      let foodUUID
      const entryUUID = uuid.v4()
      const existing = Object
        .entries(store.state.foodCache.food)
        .find(food =>
          food[1].id === this.id && food[1].source === this.source
        )

      // Cache this food so we don't have to hit the API next time
      if (!existing) {
        foodUUID = uuid.v4()
        store.commit('foodCache/addFood', {
          foodUUID,
          id: this.id,
          source: this.source,
          mass: this.mass,
          dataFood: this.dataFood,
        })
      } else {
        foodUUID = existing[0]
      }

      // Add a food entry with the cached food uuid
      store.commit('log/addEntry', {
        entryUUID,
        foodUUID,
        mass: this.mass,
      })
    },

    // We are looking at a saved food entry
    getDataFromEntry() {
      const entry = store.state.log.entries[this.entryUUID]
      const food = store.state.foodCache.food[entry.foodUUID]

      this.mass = entry.mass
      this.dataFood = food.dataFood
      this.entrySource = food.source
    },

    // Try to get dataFood from cache, then try the API
    getDataFromCache() {
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
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
