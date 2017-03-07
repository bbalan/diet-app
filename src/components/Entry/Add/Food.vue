<template>
  <div class="entry-add--food page page--menu page--padded max-width">

    <transition name="fade-spinner">
      <div v-if="loading" class="entry-add--food__spinner-wrapper">
        <md-spinner md-indeterminate></md-spinner>
      </div>
    </transition>

    <form-food
      v-if="food"
      :name="food.dataFood.name"
      :serving="food.lastLoggedMass"
      :food="food"
      :submitText="submitText"
      @submit="onSubmit">
    </form-food>

  </div>
</template>

<script>
/**
 * Entry/Add/Food tries to get food data from the foodCache. If
 * foodCache does not contain requested food, the food APIs are
 * called.
 *
 * Food data is fed to the <form-food> component, which is just
 * a dumb view containing a form. On form submit, Entry/Add/Food
 * creates a new entry in the log or in a recipe.
 */

import router from 'router'
import store from 'store'
import UUID from 'uuid'
import FormFood from 'components/Entry/Common/Food'
import { checkStatus, parseJSON } from 'util'
import { USDA, RECIPE, foodReportUSDA } from 'util/api'

export default {
  name: 'AddFood',
  props: ['id', 'source', 'isForRecipe'],
  components: { FormFood },
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
      }

      this.loading = false
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
          foodReportAPI = foodReportUSDA(this.id)
          reportHandler = this.reportHandlerUSDA
          break
        default:
          this.loading = false
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
        this.food = {
          dataFood: json.report.food,
          source: USDA,
        }
        this.isDataFromAPI = true

        this.uuid = UUID.v4()
        store.commit('foodCache/add', {
          uuid: this.uuid,
          id: this.id,
          timesLogged: 0,
          source: USDA,
          dataFood: json.report.food,
        })

        return new Promise((resolve) => { resolve() })
      } catch (e) { return e }
    },

    loadComplete() {
      this.loading = false
    },

    // FoodView emitted a submit event (user clicked Add)
    onSubmit(mass) {
      this.entryAdd(mass, this.isForRecipe)

      if (this.isForRecipe) {
        router.go(-2)
      } else {
        router.go(-9000)
        router.replace({ name: 'log' })
      }
    },

    // Commit new log entry
    entryAdd(mass, isForRecipe = false) {
      // Add a food entry with the cached food uuid
      store.commit('entry/add', {
        item: this.uuid,
        type: this.source === RECIPE ? 'recipe' : 'food',
        data: { mass },
        isForRecipe,
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
.entry-add--food
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