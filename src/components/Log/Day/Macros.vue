<template>
  <div class="day__macros">
    <span class="calories">
      {{ caloriesRounded }} kcal
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
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
  created() {
    this.calculateMacros()
  },
  computed: {
    nutrientsSum() {
      return this.fat + this.carbs + this.protein
    },
    fatPct() {
      return roundTo((this.fat / this.nutrientsSum) * 100, 1)
    },
    carbsPct() {
      return roundTo((this.carbs / this.nutrientsSum) * 100, 1)
    },
    proteinPct() {
      return roundTo((this.protein / this.nutrientsSum) * 100, 1)
    },
    caloriesRounded() {
      return roundTo(this.calories, 1)
    },
  },
  methods: {
    calculateMacros() {
      const entries = this.entries

      entries.forEach((entry) => {
        let nutrients

        if (!store.state.log.entries[entry]) return
        const entryData = store.state.log.entries[entry]

        if (!entryData || !entryData.foodUUID) return
        const food = store.state.foodCache.food[entryData.foodUUID]

        switch (food.source) {
          case API.USDA:
            nutrients = food.dataFood.nutrients

            this.calories += parseInt(nutrients.find(
              n => n.nutrient_id === '208'
            ).value, 10) * (entryData.mass / 100)

            this.fat += parseInt(nutrients.find(
              n => n.nutrient_id === '204'
            ).value, 10) * (entryData.mass / 100)

            this.carbs += parseInt(nutrients.find(
              n => n.nutrient_id === '205'
            ).value, 10) * (entryData.mass / 100)

            this.protein += parseInt(nutrients.find(
              n => n.nutrient_id === '203'
            ).value, 10) * (entryData.mass / 100)

            break
          default:
            console.error('Unsupported source')
            return
        }
      })
    },
  },
}
</script>