<template>

  <md-list-item v-if="dataEntry" class="entry-link">

    <div class="md-list-text-container max-width">

      <router-link
        :to="{ name: 'editEntry', params: { id } }"
        class="edit">

        <span class="entry-link__name">{{ name | capitalize }}</span>
        <span class="entry-link__calories">{{ calories | roundTo | roundTo | toKcal }}</span>

        <button v-if="isWorkout" class="entry-link__edit">
          <md-icon>edit</md-icon>
        </button>

      </router-link>

      <md-input-container v-if="isFood || isRecipe" class="entry-link__mass">
        <md-input
          type="number"
          ref="massInput"
          :placeholder="unitFoodShort"
          v-model.number="mass"
          @click.native="onFocus">
        </md-input>
        <span class="mass__unit input__unit">{{ unitFoodShort }}</span>
      </md-input-container>

      <!-- TODO: add three-dot menu icon for editing/deleting entry without entering entry page -->

    </div>

    <md-divider></md-divider>

  </md-list-item>
</template>

<script>
// import { truncate } from 'util'
import store from 'store'
import { USDA, CUSTOM, RECIPE } from 'util/api'
import { toKcal, roundTo, capitalize } from 'util/filters'

export default {
  props: ['id'],
  filters: { toKcal, roundTo, capitalize },
  methods: {
    onFocus() {
      const el = this.$refs.massInput.$el

      if (el) {
        el.focus()
        el.select()
      }
    },
  },
  computed: {
    dataEntry() { return store.state.entries.data.find(e => e.id === this.id) },
    isFood() { return this.dataEntry ? this.dataEntry.type === 'food' : false },
    isRecipe() { return this.dataEntry ? this.dataEntry.type === 'recipe' : false },
    isWorkout() { return this.dataEntry ? this.dataEntry.type === 'workout' : false },
    entryFood() {
      return this.isFood || this.isRecipe ? store.state.foodCache[this.dataEntry.item] : null
    },
    dataWorkout() { return this.isWorkout ? this.dataEntry.data : null },
    dataFood() { return this.entryFood ? this.entryFood.dataFood : null },
    name() {
      if ((this.isFood || this.isRecipe) && this.dataFood) return this.dataFood.name
      if (this.isWorkout && this.dataWorkout) return this.dataEntry.data.name
      return null
    },
    mass: {
      get() {
        return (this.isFood || this.isRecipe) && this.dataEntry ? this.dataEntry.data.mass : null
      },
      set(mass) {
        store.dispatch('entries/setMass', { id: this.id, mass })
      },
    },
    calories() {
      if (this.isFood || this.isRecipe) {
        if (!this.entryFood) return 0

        let energy = 0
        let calories = 0

        switch (this.entryFood.source) {
          case USDA:
            energy = this.dataFood.nutrients.find(
              nutrient => nutrient.nutrient_id === '208'
            )
            calories = energy.value * (this.mass / 100)
            break
          case RECIPE:
            calories = this.dataFood.calories / this.dataFood.totalMass * this.mass
            break
          case CUSTOM:
            calories = this.dataFood.calories / this.dataFood.serving * this.mass
            break
          default:
            break
        }

        return calories
      }

      if (this.isWorkout) {
        if (!this.dataWorkout) return null
        return this.dataWorkout.calories
      }

      return null
    },
    unitFood: () => store.state.config.unitFood,
    unitFoodShort() {
      switch (store.state.config.unitFood) {
        case 'grams': return 'g'
        default: return ''
      }
    },
  },
}
</script>

<style lang="stylus">
.entry-link
  position relative

  .md-list-item-container
    padding 0 !important

  a
    display block
    width 100%
    height 100%
    padding 16px 16px 16px 72px
    text-decoration none !important
  &__name
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    display block

  &__calories
    color rgba(0,0,0,.54) !important

  &__mass
    position absolute !important
    top 0px
    left 16px
    width 40px !important

    input
      width 36px
      max-width 30px

    &.md-input-focused
      .mass__unit
        opacity 0

    &.md-input-focused.md-has-value
      .mass__unit
        opacity 1

    .mass__unit
      bottom 10px !important

  &__edit
    position absolute
    top 8px
    left 8px
    padding 8px
    background transparent
    border none
</style>
