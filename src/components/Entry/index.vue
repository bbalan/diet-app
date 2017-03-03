<template>
  <!-- This component is for EXISTING entries only. Make a new component for new entries. -->
  <div class="entry-root page--menu page--padded">

    <!--<food-view
      :name="name"
      :serving="serving"
      :nutrients="nutrients"
      :buttonText="buttonText"
      @submit="onSubmit">
    </food-view>-->

    <!--<food v-if="isFood || isRecipe" :id="id" :source="source" :uuid="uuid" :destination="destination"></food>

    <workout v-if="isWorkout" :uuid="uuid"></workout>

    <div v-if="!dataEntry && !isFood && !isRecipe" class="page--padded">
      <div class="md-display-1">
        <md-icon>warning</md-icon>
        Entry not found
      </div>
    </div>-->

  </div>
</template>

<script>
import router from 'router'
import store from 'store'
// import FoodView from 'components/Entry/FoodView'
import * as API from 'api'
import { routerBackTo } from 'util'

export default {
  name: 'Entry',
  props: ['uuid', 'id', 'source', 'destination'],
  // components: { FoodView },
  computed: {
    dataEntry() { return store.state.entries[this.uuid] },
    entryType() { return this.dataEntry ? this.dataEntry.type : false },
    isFood() { return this.entryType === 'food' || (!!this.id && !!this.source) },
    isRecipe() { return this.entryType === 'recipe' },
    isWorkout() { return this.entryType === 'workout' },
    isCustom() { return this.isFood && this.source === API.CUSTOM },

    dataFood() {
      // Check if this is a food entry
      const entryFood = store.state.entries[this.uuid]

      // Check if this is a recipe entry
      const entryRecipe = store.state.recipe.data[this.uuid]

      if (entryFood) {
        const food = store.state.foodCache[entryFood.item]
        if (!food) return
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
    },

    name() { return this.dataFood ? this.dataFood.name : '' },
    serving() { return 0 },
    buttonText() { return 'Add' },
    nutrients() { return {} },
  },
  methods: {
    // User submitted changes to this Entry
    onSubmit() {
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

    // User is submitting a recipe entry
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
  },
}
</script>

<style lang="stylus">
.entry-root
  position absolute !important
  top 0
  left 0
  width 100%
  height 100%
  background white
  overflow-x hidden
  overflow-y scroll

.entry-name
  margin-bottom 16px
  width 100%
  overflow hidden
  position relative

.workout-entry
.workout--preset
  .entry-name
    border-right 32px solid transparent
  .md-icon.workout__edit
    position absolute
    right 0
    top 0

  .inputs
    margin 0
    position relative
    &__submit
      margin-bottom 0
    &__mass
    &__calories
      border-right 110px solid transparent
    &__eat
      position absolute
      bottom 0
      right 0
      margin-right 0
</style>