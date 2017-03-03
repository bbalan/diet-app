<template>
  <div class="entry--food page--padded page">

    <transition name="fade-spinner">
      <div v-if="loading" class="entry--food-spinner">
        <md-spinner md-indeterminate></md-spinner>
      </div>
    </transition>

    <div v-if="!loading && !dataFood" class="md-display-1">Food not found.</div>

    <transition name="page-fade">
      <div v-if="!loading && dataFood" class="entry--food__wrapper">

        <form @submit.prevent="onSubmit" :class="{ loading: loading }">
          <div :class="`${headingClass} entry-name wordwrap--fade`">
            {{ name | capitalize }}
          </div>

          <div class="inputs">
            <md-input-container class="inputs__mass" ref="massInput">
              <label>How much?</label>
              <md-input
                type="number"
                ref="massInput"
                v-model.number="mass"
                required
                @focus.native="onFocusInput('massInput')"
                @click.native="onFocusInput('massInput')"
                @keydown.native="onKeyDown">
              </md-input>
              <span class="mass__unit input__unit">{{ unitFood }}</span>
              <span class="md-error">Please enter a number.</span>
            </md-input-container>

            <md-button
              class="md-raised md-primary inputs__eat inputs__submit"
              @click.native.prevent="onSubmit">
              {{ submitText }}
            </md-button>
          </div>

          <div class="clearfix"></div>

          <nutrition-facts
            :dataFood="dataFood"
            :source="source || entrySource"
            :mass="normalizedMass">
          </nutrition-facts>
        </form>
      </div>
    </transition>

  </div>
</template>

<script>
// TODO: clean up this mess and implement proper separation of concerns
// Entry.vue should be handling data and passing on to view components
// foodData should be a computed property
// created() should call getDataFromAPI if foodData is falsy
import router from 'router'
import uuid from 'uuid'
import store from 'store'
import * as API from 'api'
import * as USDA from 'api/USDA'
import * as OTHER from 'api/other'
import { checkStatus, parseJSON } from 'api/util'
import { onFocusInput, routerBackTo } from 'util'
import { capitalize } from 'util/filters'
import NutritionFacts from './NutritionFacts'

export default {
  name: 'Food',
  props: ['id', 'source', 'uuid', 'destination'],
  components: { NutritionFacts },
  filters: { capitalize },
  data() {
    return {
      mass: 100, // TODO: offer more units (oz, cups, ml, ...)
      dataFood: null,
      timesLogged: null,
      entrySource: null,
      loading: false,
      cacheUUID: null,
      isFood: false,
      isRecipe: false,
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    $route: 'getData', // if route changes, re-hydrate component
  },
  computed: {
    name() {
      if (!this.dataFood) return ''
      return this.dataFood.name
    },
    submitText() {
      if (this.uuid) {
        if (this.isRecipe) {
          return 'Add'
        }
        return 'Save'
      } else if (this.isForRecipe) {
        return 'Add to recipe'
      }
      return 'Eat'
    },

    // On submit, add this food to a recipe instead of the log
    isForRecipe() {
      return this.destination === 'recipe'
    },

    // Return 0 if mass is blank
    normalizedMass() {
      if (typeof this.mass !== 'number') return 0
      return this.mass
    },

    // Use smaller font for title if text is too long
    headingClass() {
      if (!this.dataFood) return ''

      const len = this.dataFood.name.length

      if (len <= 20) {
        return 'md-display-1'
      } else if (len > 20 && len <= 50) {
        return 'md-title'
      }
      return 'md-subheading'
    },
    unitFood: () => store.state.config.unitFood,
  },

  methods: {
    // User pressed the Eat button
    onSubmit() {
      // Validate mass
      if (!this.mass) {
        this.$refs.massInput.$el.classList.add('md-input-invalid')
        return
      }

      if (this.uuid) {
        if (this.isFood) {
          this.entryEdit()
        }

        if (this.isRecipe) {
          this.recipeAdd()
        }

        routerBackTo('log')
      } else if (this.isForRecipe) {
        this.entryAdd(true)
        routerBackTo('entryRecipe')
      } else {
        this.entryAdd()
        routerBackTo('log')
      }
    },

    recipeAdd() {
      store.commit('entries/add', {
        item: this.uuid,
        type: 'recipe',
        data: { mass: this.mass },
      })
    },

    // Commit new log entry
    entryAdd(addToRecipe = false) {
      // Add a food entry with the cached food uuid
      store.commit('entries/add', {
        item: this.cacheUUID,
        type: 'food',
        data: { mass: this.mass },
        addToRecipe,
      })

      store.commit('foodCache/increment', this.cacheUUID)
      store.commit('foodCache/setLastLoggedMass', {
        uuid: this.cacheUUID,
        lastLoggedMass: this.mass,
      })
    },

    // Save changes to this entry
    entryEdit() {
      store.commit('entries/edit', {
        uuid: this.uuid,
        data: { mass: this.mass },
      })
      store.commit('foodCache/setLastLoggedMass', {
        uuid: this.cacheUUID,
        lastLoggedMass: this.mass,
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
      } else if (!this.getDataFromCache()) {
        this.getDataFromAPI()
      }
    },

    // We are looking at a saved entry
    getDataFromEntry() {
      // Check if this is a food entry
      const entryFood = store.state.entries[this.uuid]

      // Check if this is a recipe entry
      const entryRecipe = store.state.recipe.data[this.uuid]

      if (entryFood) {
        const food = store.state.foodCache[entryFood.item]
        this.isFood = true
        this.mass = entryFood.data.mass
        this.dataFood = food.dataFood
        this.entrySource = food.source
      } else if (entryRecipe) {
        this.isRecipe = true
        this.mass = entryRecipe.nutrients.serving
        this.dataFood = entryRecipe
        this.entrySource = API.RECIPE
      } else {
        routerBackTo('log')
        return
      }

      this.focusInput()
    },

    // Try to get dataFood from cache
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
        const key = existing[0]
        const data = existing[1]

        this.cacheUUID = key
        this.mass = data.lastLoggedMass || this.mass
        this.dataFood = data.dataFood
        this.timesLogged = data.timesLogged || 1

        this.focusInput()

        return true
      }

      return false
    },

    // Hit the source API for food data
    getDataFromAPI() {
      let foodReportAPI // composed URL of food API
      let reportHandler // do API-specific things with returned data

      const usdaReportHandler = (json) => {
        try {
          this.dataFood = json.report.food
          return new Promise((resolve) => { resolve() })
        } catch (e) { return e }
      }

      const otherReportHandler = (/* json */) => {
        // Not implemented
      }

      const loadComplete = () => {
        this.loading = false
        this.cacheFood()
        this.focusInput()
      }

      this.loading = true

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
        .then(loadComplete)
        .catch(() => {
          this.loading = false
          this.dataFood = null
        })
    },

    // Add dataFood to cache
    cacheFood() {
      this.cacheUUID = uuid.v4()
      store.commit('foodCache/add', {
        uuid: this.cacheUUID,
        id: this.id,
        timesLogged: 0,
        source: this.source,
        dataFood: this.dataFood,
      })
    },
    focusInput() {
      setTimeout(() => {
        const ref = this.$refs.massInput

        if (!ref) return

        const el = this.$refs.massInput.$el
        const input = el.querySelector('input')

        if (input) input.focus()

        return
      }, 100)
    },
    onFocusInput,
    onKeyDown(e) {
      // TODO: disable tab for desktop?
      if (e.code === 'Enter' || e.code === 'Tab') {
        this.onSubmit()
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.entry--food

  .inputs
    display flex
    flex-direction row

  .inputs__mass
    //

  .inputs__eat
    top 8px
    margin-right 0
    margin-left 16px
    height 36px
    min-width 130px !important

  &-spinner
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
