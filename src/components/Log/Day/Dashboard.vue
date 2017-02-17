<template>
  <div class="dashboard">

    <canvas id="caloriesGauge"></canvas>

    <!--<pre>{{ entryDetails }}</pre>-->
    <!--<pre>{{ foodDetails }}</pre>-->
    <!--<pre>{{ workoutDetails }}</pre>-->

    <!--<p class="tdee">Goal: {{ caloriesToEat | roundTo | toKcal }}</p>-->
    <p class="calories">Eaten: {{ calories | roundTo | toKcal}}</p>
    <p class="workoutCalories">Workout: {{ workoutCalories | roundTo | toKcal }}</p>
    <p>Remaining: {{ caloriesRemaining | roundTo | toKcal }}</p>
    <p class="percentages">
      Macros: {{ fatPct | roundTo }} F / {{ carbsPct | roundTo }} C / {{ proteinPct | roundTo }} P
    </p>

    <progress-bar 
      :current="calories" 
      :total="caloriesToEat">
    </progress-bar>

    <!--<span class="nutrient">{{ carbs }}g carbs</span>-->
    <!--<span class="nutrient">{{ fat }}g fat</span>-->
    <!--<span class="nutrient">{{ protein }}g protein</span>-->
  </div>
</template>

<script>
/* eslint-disable */

import store from 'store'
import * as API from 'api'
import { toKcal, roundTo } from 'util/filters'
import ProgressBar from 'components/Log/Day/ProgressBar'
import { Gauge } from 'gaugeJS/dist/gauge.min'

let gauge

export default {
  name: 'Dashboard',
  props: ['entries', 'tdee'],
  filters: { toKcal, roundTo },
  data() {
    return {
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
  components: { ProgressBar },
  mounted() {
    const opts = {
      angle: -0.25,
      lineWidth: 0.05,
      radiusScale: 1,
      pointer: {
        length: 0.38,
        strokeWidth: 0.011,
        color: '#000000',
      },
      limitMax: false,
      limitMin: false,
      colorStart: '#6FADCF',
      colorStop: '#8FC0DA',
      strokeColor: '#E0E0E0',
      generateGradient: true,
      highDpiSupport: true,
    }

    const target = document.getElementById('caloriesGauge')

    gauge = new Gauge(target).setOptions(opts)
    gauge.maxValue = 3000
    gauge.setMinValue(0)
    gauge.animationSpeed = 128
    gauge.set(1250)
  },
  computed: {
    entryDetails() {
      return this.entries.map(entry => store.state.entries[entry])
    },
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
    workoutDetails() {
      return this.entryDetails
        .filter(entry => entry.type === 'workout')
        // .reduce((a, b) => a.data.calories + b.data.calories)
    },
    workoutCalories() {
      return this.workoutDetails
        .reduce((a, b) => a + parseInt(b.data.calories, 10), 0)
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
      return (this.fat / this.sumMacros) * 100
    },
    carbsPct() {
      if (this.sumMacros === 0) return 0
      return (this.carbs / this.sumMacros) * 100
    },
    proteinPct() {
      if (this.sumMacros === 0) return 0
      return (this.protein / this.sumMacros) * 100
    },
    caloriesToEat() {
      return this.tdee + this.workoutCalories
    },
    caloriesTotal() {
      return this.calories - this.workoutCalories
    },
    caloriesRemaining() {
      if (!this.tdee) {
        return 0
      }
      return this.tdee - this.caloriesTotal
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
.dashboard
  margin-bottom 20px

#caloriesGauge
  width 250px
  height 250px
  transform rotate(-45deg)
</style>