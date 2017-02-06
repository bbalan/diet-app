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
    entryDetails() {
      return this.entries.map(entry => store.state.entries.data[entry])
    },
    foodDetails() {
      return this.entryDetails.map((entry) => {
        const foodItem = store.state.foodCache.food[entry.item]
        foodItem.mass = entry.mass
        return foodItem
      })
    },
    calories() {
      return this.usdaComputeNutrient('208')
    },
    carbs() {
      return this.usdaComputeNutrient('205')
    },
    fat() {
      return this.usdaComputeNutrient('204')
    },
    protein() {
      return this.usdaComputeNutrient('203')
    },
    nutrientsSum() {
      return this.fat + this.carbs + this.protein
    },
    fatPct() {
      return Math.floor(roundTo((this.fat / this.nutrientsSum) * 100, 1))
    },
    carbsPct() {
      return Math.floor(roundTo((this.carbs / this.nutrientsSum) * 100, 1))
    },
    proteinPct() {
      return Math.floor(roundTo((this.protein / this.nutrientsSum) * 100, 1))
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
          default:
            break
        }
      })

      return total
    },
  },
}
</script>