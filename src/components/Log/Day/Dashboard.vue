<template>
  <md-whiteframe md-elevation="2" class="dashboard page">

    <div class="dashboard__stats page">

      <div class="stats page--padded max-width">
        <!--<p>Weight: {{ mass | toMassUnit}}</p>-->
        <p>Remain: {{ caloriesRemaining | roundTo | toKcal }} ({{ mealsRemaining | roundTo(1) }} meals x {{ caloriesToEat / numMeals | roundTo | toKcal }})</p>
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
import { computeNutrient } from 'util'
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
    mass: () => store.state.calendar.data[store.state.calendar.currentDay].userInfo.mass,
    numMeals: () => store.state.userInfo.numMeals,
    entryDetails() {
      return this.entries.map(entry => store.state.entries.data[entry])
    },
    foodDetails() {
      const foodDetails = []

      this.entryDetails
        .filter(entry => entry && (entry.type === 'food' || entry.type === 'recipe'))
        .forEach((entry) => {
          const food = store.state.foodCache[entry.item]
          if (!food) return

          foodDetails.push({
            mass: entry.data.mass,
            dataFood: food.dataFood,
            source: food.source,
          })
        })

      return foodDetails
    },
    workoutDetails() {
      return this.entryDetails.filter(entry => entry && entry.type === 'workout')
    },
    workoutCalories() { return this.workoutDetails.reduce((a, b) => a + b.data.calories, 0) },

    calories() { return computeNutrient(this.foodDetails, 'calories', '208') },
    fat() { return computeNutrient(this.foodDetails, 'fat', '204') },
    carbs() { return computeNutrient(this.foodDetails, 'carbs', '205') },
    protein() { return computeNutrient(this.foodDetails, 'protein', '203') },

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
  p
    margin 4px 0
    display block
    float none

.calories
.perMeal
  float left
  margin-right 16px !important
  display block
</style>