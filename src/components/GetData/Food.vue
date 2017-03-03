<template>
  <div class="get-data--food page page--menu">

    <view-food
      v-if="food"
      :name="dataFood.name"
      :serving="food.lastLoggedMass"
      :food="food"
      :submitText="submitText"
      @submit="onSubmit">
    </view-food>

  </div>
</template>

<script>
import store from 'store'
import UUID from 'uuid'
import ViewFood from 'components/Views/Food'
import * as API from 'api'
import * as USDA from 'api/USDA'
import * as OTHER from 'api/other'
import { routerBackTo } from 'util'
import { checkStatus, parseJSON } from 'api/util'

export default {
  name: 'GetDataFood',
  props: ['id', 'source', 'isForRecipe'],
  components: { ViewFood },
  data: () => ({
    uuid: null,
    food: {},
    isDataFromCache: false,
    isDataFromAPI: false,
    loading: true,
  }),
  created() {
    if (!this.getDataFromCache()) this.getDataFromAPI()
  },
  computed: {
    submitText() { return this.isForRecipe ? 'Add to recipe' : 'Eat' },
    dataFood() { return this.food.dataFood },
  },
  methods: {
    // Try to get food data from cache
    getDataFromCache() {
      const existing = Object
        .entries(store.state.foodCache)
        .find((food) => {
          const data = food[1]
          if (data) {
            return data.id === this.id && data.source === this.source
          }
          return false
        })

      if (existing) {
        this.uuid = existing[0]
        this.food = existing[1]

        this.isDataFromCache = true
        this.loading = false
      }

      return this.isDataFromCache
    },

    // Hit the source API for food data
    getDataFromAPI() {
      let foodReportAPI // composed URL of food API
      let reportHandler // do API-specific things with returned data

      this.loading = true

      // Figure out which API URLs and handlers to use
      switch (this.source) {
        case API.USDA:
          foodReportAPI = USDA.foodReport(this.id)
          reportHandler = this.reportHandlerUSDA.bind(this)
          break
        case API.OTHER:
          foodReportAPI = OTHER.foodReport(this.id)
          // reportHandler = this.otherReportHandler.bind(this)
          reportHandler = () => {}
          break
        default:
          return // invalid source
      }

      // do the search
      fetch(foodReportAPI)
        .then(checkStatus)
        .then(parseJSON)
        .then(reportHandler)
        .then(this.loadComplete)
        .catch((e) => {
          console.error(e)
          this.loading = false
          this.food = null
        })
    },

    reportHandlerUSDA(json) {
      try {
        this.food = json.report.food
        this.isDataFromAPI = true
        return new Promise((resolve) => { resolve() })
      } catch (e) { return e }
    },

    loadComplete() {
      this.loading = false
      this.cacheFood()
    },

    // Add dataFood to cache
    cacheFood() {
      this.uuid = UUID.v4()
      store.commit('foodCache/add', {
        uuid: this.uuid,
        id: this.id,
        timesLogged: 0,
        source: this.source,
        dataFood: this.food,
      })
    },

    // FoodView emitted a submit event (user clicked Add)
    onSubmit(mass) {
      if (this.isForRecipe) {
        this.entryAdd(mass, true)
        routerBackTo('entryRecipe')
      } else {
        this.entryAdd(mass)
        routerBackTo('log')
      }
    },

    // Commit new log entry
    entryAdd(mass, addToRecipe = false) {
      // Add a food entry with the cached food uuid
      store.commit('entries/add', {
        item: this.uuid,
        type: 'food',
        data: { mass },
        addToRecipe,
      })

      store.commit('foodCache/increment', this.uuid)
      store.commit('foodCache/setLastLoggedMass', {
        uuid: this.uuid,
        lastLoggedMass: mass,
      })
    },
  },
}
</script>

<style lang="stylus">

</style>