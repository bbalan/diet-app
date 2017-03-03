<template>
  <div class="get-data--food page page--menu">

    <transition name="fade-spinner">
      <div v-if="loading" class="get-data--food__spinner-wrapper">
        <md-spinner md-indeterminate></md-spinner>
      </div>
    </transition>

    <view-food
      v-if="food"
      :name="dataFood.name"
      :serving="food.lastLoggedMass"
      :food="food"
      :submitText="submitText"
      @submit="onSubmit">
    </view-food>

    <!--<pre>{{ food }}</pre>-->

  </div>
</template>

<script>
/**
 * GetData/Food tries to get food data from the foodCache. If
 * foodCache does not contain requested food, the food APIs are
 * called.
 *
 * Food data is fed to the <view-food> component, which is just
 * a dumb view containing a form. On form submit, GetData/Food
 * creates a new entry in the log or in a recipe.
 */

import store from 'store'
import UUID from 'uuid'
import ViewFood from 'components/Views/Food'
import { USDA, checkStatus, parseJSON } from 'api'
import * as API_USDA from 'api/USDA'
import { routerBackTo } from 'util'

export default {
  name: 'GetDataFood',
  props: ['id', 'source', 'isForRecipe'],
  components: { ViewFood },
  data: () => ({
    uuid: null, // cache uuid of food being requested (may be null)
    food: null, // food data from foodCache or API
    isDataFromCache: false, // food data was obtained from foodCache
    isDataFromAPI: false, // food data was obtained from external API
    loading: true, // show spinner
  }),
  created() {
    if (!this.getDataFromCache()) this.getDataFromAPI()
  },
  computed: {
    // What text to display on the <view-food> submit button
    submitText() { return this.isForRecipe ? 'Add to recipe' : 'Eat' },
    // Shorthand for this.food.dataFood
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
        case USDA:
          foodReportAPI = API_USDA.foodReport(this.id)
          reportHandler = this.reportHandlerUSDA.bind(this)
          break
        default: return // invalid source
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
        this.food = {
          dataFood: json.report.food,
          source: USDA,
        }
        this.isDataFromAPI = true
        return new Promise((resolve) => { resolve() })
      } catch (e) { return e }
    },

    loadComplete() {
      this.loading = false
      // this.cacheFood()
    },

    // Add dataFood to cache so we don't have to hit the API next time
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
.get-data--food

  &__spinner-wrapper
    position absolute
    top 0
    left 0
    width 100%
    height 100%

    .md-spinner
      position absolute
      top 50%
      left 50%
      margin -25px 0 0 -25px
</style>