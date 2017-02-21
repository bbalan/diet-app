<template>
  
  <md-list-item v-if="dataEntry" class="entry-link">

    <!--<div class="entry-link__contents">-->
    <div class="md-list-text-container">
      <span class="entry-link__name">{{ name }}</span>
      <span class="entry-link__calories">{{calories | roundTo | roundTo | toKcal}}</span>

      <router-link
        :to="`entry/${uuid}`"
        class="edit">
      </router-link>

      <md-input-container v-if="isFood" class="entry-link__mass">
        <md-input 
          type="number"  
          ref="massInput"
          :placeholder="unitFood"
          v-model.number="mass"
          @click.native="onFocus">
        </md-input>
        <span class="mass__unit">{{ unitFoodShort }}</span>
      </md-input-container>
    </div>

    <md-divider></md-divider>

  </md-list-item>
</template>

<script>
// import { truncate } from 'util'
import store from 'store'
import { USDA, OTHER } from 'api'
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

        switch (this.foodFromCache.source) {
          case USDA:
            energy = this.dataFood.nutrients.find(
              nutrient => nutrient.nutrient_id === '208'
            )
            break
          case OTHER:
          default:
            // Not implemented
            break
        }

        return energy.value * (this.mass / 100)
      }

      if (this.isWorkout) {
        if (!this.dataWorkout) return null
        return this.dataWorkout.calories
      }

      return null
    },
    unitFood: () => store.state.appSettings.unitFood,
    unitFoodShort() {
      switch (store.state.appSettings.unitFood) {
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
    padding 20px 16px
    /*color black !important*/
    text-decoration none !important
  &__name
    white-space nowrap
    display block
    border-right 64px solid transparent
    /*display block
    width 100%
    border-right 150px solid transparent
    overflow hidden*/
  &__calories
    color rgba(0,0,0,.54) !important
    /*display block
    position absolute
    top 0
    right 0
    padding 16px*/
  &__mass
    position absolute
    top 0px
    right 16px
    width 48px

    &.md-input-focused
      .mass__unit
        opacity 0

    &.md-input-focused.md-has-value
      .mass__unit
        opacity 1

    .mass__unit
      bottom 10px !important
</style>
