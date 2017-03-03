<template>

  <md-list-item v-if="dataEntry" class="entry-link">

    <div class="md-list-text-container">

      <router-link
        :to="{ name: 'entry', params: { uuid } }"
        class="edit">

        <span class="entry-link__name">{{ name }}</span>
        <span class="entry-link__calories">{{ calories | roundTo | roundTo | toKcal }}</span>

        <button v-if="isWorkout" class="entry-link__edit">
          <md-icon>create</md-icon>
        </button>

      </router-link>

      <md-input-container v-if="isFood" class="entry-link__mass">
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
import * as API from 'api'
import { toKcal, roundTo } from 'util/filters'

export default {
  props: ['uuid'],
  filters: { toKcal, roundTo },
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
    dataEntry() {
      return store.state.entries[this.uuid]
    },
    isFood() {
      if (this.dataEntry) return this.dataEntry.type === 'food'
      return false
    },
    isWorkout() {
      if (this.dataEntry) return this.dataEntry.type === 'workout'
      return false
    },
    foodFromCache() {
      if (this.isFood) {
        return store.state.foodCache[this.dataEntry.item]
      }
      return null
    },
    dataWorkout() {
      if (this.isWorkout) {
        return this.dataEntry.data
      }
      return null
    },
    dataFood() {
      if (this.foodFromCache) {
        return this.foodFromCache.dataFood
      }
      return null
    },
    name() {
      if (this.isFood && this.dataFood) {
        // return truncate(this.dataFood.name, 50)
        return this.dataFood.name
      }

      if (this.isWorkout && this.dataWorkout) {
        // return truncate(this.dataEntry.data.name, 50)
        return this.dataEntry.data.name
      }

      return null
    },
    mass: {
      get() {
        if (this.isFood && this.dataEntry) {
          return this.dataEntry.data.mass
        }
        return null
      },
      set(mass) {
        store.commit('entries/setMass', {
          uuid: this.uuid,
          mass,
        })
      },
    },
    calories() {
      if (this.isFood) {
        if (!this.foodFromCache) return 0

        let energy = 0
        let calories = 0

        switch (this.foodFromCache.source) {
          case API.USDA:
            energy = this.dataFood.nutrients.find(
              nutrient => nutrient.nutrient_id === '208'
            )
            calories = energy.value * (this.mass / 100)
            break
          case API.OTHER:
            // not implemented
            break
          case API.CUSTOM:
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

<style scoped lang="stylus">
.entry-link
  position relative

  a
    display block
    width 100%
    height 100%
    position absolute
    top 0
    left 0
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
    position absolute
    top 0px
    left 16px
    width 40px

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
