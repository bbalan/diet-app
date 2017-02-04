<template>
  <li v-if="dataEntry">
    <router-link :to="`entry/${entryUUID}`" class="edit">edit</router-link> 
    <span class="name">{{ dataFood.name }}</span>
    <span class="mass">{{mass}} g</span>
    <span class="calories">{{calories}}</span>
  </li>
</template>

<script>
import store from 'store'
import { USDA, OTHER } from 'api'
import { roundTo } from 'util'

export default {
  props: ['entryUUID'],
  computed: {
    dataEntry() {
      return store.state.log.entries[this.entryUUID]
    },
    foodFromCache() {
      return store.state.foodCache.food[this.dataEntry.foodUUID]
    },
    dataFood() {
      return this.foodFromCache.dataFood
    },
    mass() {
      return this.dataEntry.mass
    },
    calories() {
      let energy = 0

      switch (this.foodFromCache.source) {
        case USDA:
          energy = this.dataFood.nutrients.find(
            nutrient => nutrient.nutrient_id === '208'
          )
          break
        case OTHER:
        default:
          console.error('API not implemented')
          break
      }

      const energyVal = roundTo(energy.value * (this.mass / 100), 1)
      return `${energyVal} ${energy.unit}`
    },
  },
}
</script>

<style scoped lang="stylus">
.edit
  width 50px
  color #42b983
.name
  display inline-block
  width 60%
.mass
.calories
  display inline-block
  width 100px
  text-align right
.calories
  font-weight bold
span
  margin 0 10px
</style>
