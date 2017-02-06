<template>
  <div class="day__macros">

    <!--<p class="tdee">TDEE: {{ tdee }} kcal</p>
    <p class="calories">Eaten: {{ caloriesRounded }} kcal</p>
    <p>Remaining: {{ caloriesRemaining }} kcal</p>
    <p>Eaten: {{ caloriesEatenPct }}%</p>-->
    <p class="percentages">
      Macros: {{ fatPct }} / {{ carbsPct }} / {{ proteinPct }}
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
    calories() { return this.usdaComputeNutrient('208') },
    carbs() { return this.usdaComputeNutrient('205') },
    fat() { return this.usdaComputeNutrient('204') },
    protein() { return this.usdaComputeNutrient('203') },
    sumMacros() {
      return this.fat + this.carbs + this.protein
    },
    fatPct() {
      return Math.floor(roundTo((this.fat / this.sumMacros) * 100, 1))
    },
    carbsPct() {
      return Math.floor(roundTo((this.carbs / this.sumMacros) * 100, 1))
    },
    proteinPct() {
      return Math.floor(roundTo((this.protein / this.sumMacros) * 100, 1))
    },
    caloriesRounded() {
      return Math.floor(this.calories)
    },
  },
  methods: {
    usdaComputeNutrient(nutrientID) {
      let total = 0
      let energy
      let value

      this.foodDetails.forEach((item) => {
        switch (item.source) {
          case API.USDA:
            energy = item.dataFood.nutrients.find(nutrient => nutrient.nutrient_id === nutrientID)
            if (energy) {
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
