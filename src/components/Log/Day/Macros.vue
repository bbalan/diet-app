<template>
  <div class="day__macros">
    <span class="calories">
      Eaten: {{ caloriesRounded }} kcal
    </span>
    <span class="percentages">
      {{ fatPct }} / {{ carbsPct }} / {{ proteinPct }}
    </span>
    <!--<span class="nutrient">{{ carbs }}g carbs</span>-->
    <!--<span class="nutrient">{{ fat }}g fat</span>-->
    <!--<span class="nutrient">{{ protein }}g protein</span>-->
  </div>
</template>

<script>
import store from 'store'
import * as API from 'api'
import { roundTo } from 'util'

export default {
  name: 'Macros',
  props: ['entries'],
  data() {
    return {
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
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
              console.log(value)
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