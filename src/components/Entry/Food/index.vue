<template>
  <div v-if="dataFood" class="food-entry grid__outer">

    <span v-if="loading" class="loading">Loading...</span>

    <form @submit.prevent="onSubmit" :class="{ loading: loading }">
      <div class="md-display-1 entry-name">
        {{ dataFood.name }}
        <p class="md-caption" v-if="source || entrySource">Source: {{ source || entrySource }}</p>
      </div>
      

      <!--<hr class="md-divider">-->

      <div class="inputs">
        <md-input-container class="inputs__mass">
          <label>Mass</label>
          <md-input type="number" v-model.number="mass"></md-input>
          <span class="mass__unit">grams</span>
        </md-input-container>

        <md-button v-if="!uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
          Eat
        </md-button>
        <md-button v-if="uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
          Save
        </md-button>
      </div>

      <!-- Moved this to MainNav.vue -->
      <!--<button v-if="uuid" @click="entryDelete">Delete</button>-->

      <nutrition-facts
        :dataFood="dataFood" 
        :source="source || entrySource"
        :mass="normalizedMass">
      </nutrition-facts>
    </form>
    
  </div>
</template>

<script>
import router from 'router'
import uuid from 'uuid'
import store from 'store'
import * as API from 'api'
import * as USDA from 'api/USDA'
import * as OTHER from 'api/other'
import { checkStatus, parseJSON } from 'api/util'
import NutritionFacts from './NutritionFacts'

export default {
  name: 'Food',
  props: ['id', 'source', 'uuid'],
  components: { NutritionFacts },
  data() {
    return {
      mass: 100, // TODO: offer more units (oz, cups, ml, ...)
      dataFood: null,
      entrySource: null,
      loading: false,
    }
  },
  created() {
    this.getData()
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
      if (this.uuid) {
        this.entryEdit()
      } else {
        this.entryAdd()
      }

      router.push('/log')
    },

    // Commit new log entry
    entryAdd() {
      let foodUUID
      const existing = Object
        .entries(store.state.foodCache)
        .find(food =>
          food[1].id === this.id && food[1].source === this.source
        )

      // Cache this food so we don't have to hit the API next time
      if (!existing) {
        foodUUID = uuid.v4()
        store.commit('foodCache/addFood', {
          uuid: foodUUID,
          id: this.id,
          source: this.source,
          // mass: this.mass, // TODO: remove? not sure if used anywhere
          dataFood: this.dataFood,
        })
      } else {
        // Already cached
        foodUUID = existing[0]
      }

      // Add a food entry with the cached food uuid
      store.commit('entries/add', {
        item: foodUUID,
        type: 'food',
        data: { mass: this.mass },
      })
    },

    // Save changes to this entry
    entryEdit() {
      store.commit('entries/edit', {
        uuid: this.uuid,
        data: { mass: this.mass },
      })
    },

    // Remove this entry forever
    entryDelete() {
      store.commit('entries/delete', { uuid: this.uuid })
      router.push('/log')
    },

    getData() {
      if (this.uuid) {
        this.getDataFromEntry()
      } else {
        this.getDataFromCache()
      }
    },

    // We are looking at a saved food entry
    getDataFromEntry() {
      const entry = store.state.entries[this.uuid]

      if (!entry) {
        router.push('/log')
        return
      }

      const food = store.state.foodCache[entry.item]

      this.mass = entry.data.mass
      this.dataFood = food.dataFood
      this.entrySource = food.source
    },

    // Try to get dataFood from cache, then try the API
    getDataFromCache() {
      const foodCache = store.state.foodCache
      const existing = Object
        .entries(foodCache)
        .find((food) => {
          if (food[1]) {
            return food[1].id === this.id && food[1].source === this.source
          }
          return false
        })

      if (existing) {
        this.dataFood = existing[1].dataFood
      } else {
        this.loading = true
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
          return e
        }
        return true
      }

      function otherReportHandler(/* json */) {
        // Not implemented
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
        .then(() => { this.loading = false })
        .catch(error => error)

      return
    },
  },
}
</script>

<style scoped lang="stylus">
form.loading
  background red
</style>
