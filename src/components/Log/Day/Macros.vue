<template>
  <div class="macros">

    <!--<p class="tdee">TDEE: {{ tdee }} kcal</p>-->
    <!--<p class="calories">Eaten: {{ caloriesRounded }} kcal</p>-->
    <p>Remaining: {{ caloriesRemaining }} kcal</p>
    <!--<p>Eaten: {{ caloriesEatenPct }}%</p>-->
    <p class="percentages">
      Macros: {{ fatPct }} F / {{ carbsPct }} C / {{ proteinPct }} P
    </p>
    <progress-bar :eaten="caloriesRounded" :tdee="tdee"></progress-bar>
    <!--<span class="nutrient">{{ carbs }}g carbs</span>-->
    <!--<span class="nutrient">{{ fat }}g fat</span>-->
    <!--<span class="nutrient">{{ protein }}g protein</span>-->
  </div>
</template>

<script>
import store from 'store'
import * as API from 'api'
import { roundTo } from 'util'
import ProgressBar from 'components/Log/Day/ProgressBar'

export default {
  name: 'Macros',
  props: ['entries', 'tdee'],
  data() {
    return {
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
  components: { ProgressBar },
  computed: {
    foodDetails() {
      const entryDetails = this.entries.map(
        entry => store.state.entries.data[entry]
      )

      const foods = entryDetails.map(
        entry => store.state.foodCache.food[entry.item]
      )

      const foodDetails = []

      for (let i = 0; i < entryDetails.length; i += 1) {
        foodDetails.push({
          mass: entryDetails[i].mass,
          dataFood: foods[i].dataFood,
          source: foods[i].source,
        })
      }

      return foodDetails
    },
    calories() { return this.computeNutrient('208') },
    carbs() { return this.computeNutrient('205') },
    fat() { return this.computeNutrient('204') },
    protein() { return this.computeNutrient('203') },
    sumMacros() {
      return this.fat + this.carbs + this.protein
    },
    fatPct() {
      if (this.sumMacros === 0) return 0
      return Math.floor(roundTo((this.fat / this.sumMacros) * 100, 1))
    },
    carbsPct() {
      if (this.sumMacros === 0) return 0
      return Math.floor(roundTo((this.carbs / this.sumMacros) * 100, 1))
    },
    proteinPct() {
      if (this.sumMacros === 0) return 0
      return Math.floor(roundTo((this.protein / this.sumMacros) * 100, 1))
    },
    caloriesRounded() {
      return Math.floor(this.calories)
    },
    caloriesRemaining() {
      if (!this.tdee) {
        return 0
      }
      return Math.floor(roundTo(this.tdee - this.calories, 1))
    },
  },
  methods: {
    computeNutrient(nutrientID) {
      let total = 0
      let energy
      let value

      this.foodDetails.forEach((item) => {
        switch (item.source) {
          case API.USDA:
            energy = item.dataFood.nutrients.find(nutrient => nutrient.nutrient_id === nutrientID)
            if (energy && energy.value) {
              value = parseInt(energy.value, 10) * item.mass / 100
              total += value
            }
            break
          case API.OTHER:
            // TODO: implement other API
            total = 0
            break
          default:
            break
        }
      })

      return total
    },
  },
}
</script>

<style scoped lang="stylus">
.macros
  margin-bottom 20px
</style>