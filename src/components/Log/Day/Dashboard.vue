<template>
  <md-whiteframe md-elevation="2" class="dashboard page">

    <div class="dashboard__stats page page--padded">

      <div class="stats">
        <!--<p>Weight: {{ mass | toMassUnit}}</p>-->
        <p>Remain: {{ caloriesRemaining | roundTo | toKcal }} ({{ mealsRemaining | roundTo(1) }} meals x {{ caloriesToEat / numMeals | roundTo | toKcal }} each)</p>
        <p class="percentages">
          Macros: {{ fatPct | roundTo }}% fat &nbsp; {{ carbsPct | roundTo }}% carbs &nbsp; {{ proteinPct | roundTo }}% protein
        </p>
      </div>
    </div>

    <md-progress class="md-accent dashboard__progress" :md-progress="caloriesPercent"></md-progress>

  </md-whiteframe>
</template>

<script>
import store from 'store'
import * as API from 'api'
import { toKcal, roundTo, toMassUnit } from 'util/filters'
import ProgressBar from 'components/Log/Day/ProgressBar'

export default {
  name: 'Dashboard',
  props: ['entries', 'tdee'],
  filters: { toKcal, roundTo, toMassUnit },
  data() {
    return {
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
  components: { ProgressBar },
  computed: {
    mass: () => store.state.calendar.data[store.state.calendar.currentDay].userInfo.metrics.mass,
    numMeals: () => store.state.userInfo.metrics.numMeals,
    entryDetails() { return this.entries.map(entry => store.state.entries[entry]) },
    foodDetails() {
      const foodDetails = []

      this.entryDetails
        .filter(entry => entry.type === 'food')
        .forEach((entry) => {
          const food = store.state.foodCache[entry.item]

          foodDetails.push({
            mass: entry.data.mass,
            dataFood: food.dataFood,
            source: food.source,
          })
        })

      return foodDetails
    },
    workoutDetails() { return this.entryDetails.filter(entry => entry.type === 'workout') },
    workoutCalories() { return this.workoutDetails.reduce((a, b) => a + b.data.calories, 0) },

    calories() { return this.computeNutrient('calories', '208') },
    carbs() { return this.computeNutrient('carbs', '205') },
    fat() { return this.computeNutrient('fat', '204') },
    protein() { return this.computeNutrient('protein', '203') },

    sumMacros() { return this.fat + this.carbs + this.protein },
    fatPct() { return this.sumMacros !== 0 ? (this.fat / this.sumMacros) * 100 : 0 },
    carbsPct() { return this.sumMacros !== 0 ? (this.carbs / this.sumMacros) * 100 : 0 },
    proteinPct() { return this.sumMacros !== 0 ? (this.protein / this.sumMacros) * 100 : 0 },
    caloriesToEat() { return this.tdee + this.workoutCalories },
    caloriesTotal() { return this.calories - this.workoutCalories },
    caloriesRemaining() { return this.tdee ? this.tdee - this.caloriesTotal : 0 },
    caloriesPercent() { return this.calories / this.caloriesToEat * 100 },
    mealsEaten() { return this.caloriesPercent / (100 / this.numMeals) },
    mealsRemaining() { return this.numMeals - this.mealsEaten },
  },
  methods: {
    computeNutrient(customID, USDA_ID) {
      let total = 0
      let energy
      let value

      this.foodDetails.forEach((item) => {
        switch (item.source) {
          case API.USDA:
            energy = item.dataFood.nutrients.find(
              nutrient => nutrient.nutrient_id === USDA_ID
            )

            if (energy && energy.value) {
              value = parseInt(energy.value, 10) * item.mass / 100
              total += value
            }
            break
          case API.OTHER:
            total = 0
            break
          case API.CUSTOM:
            total += item.dataFood[customID] / item.dataFood.serving * item.mass
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
.dashboard
  position absolute
  top 0
  left 0
  height 80px
  background white
  z-index 2
  overflow hidden

  &__progress
    position absolute
    bottom 0
    left 0

  &__stats
    overflow hidden
    padding-bottom 20px !important

.stats
  /*margin-left 96px*/

  p
    margin 4px 0
    display block
    float none

/*#caloriesGauge
  width 80px
  height 80px
  transform rotate(-45deg)
  float left
  margin-right 16px
  margin-bottom 16px
  position absolute
  top 4px
  left 8px*/

.calories
.perMeal
  float left
  margin-right 16px !important
  display block
</style>