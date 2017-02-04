<template>
  <div class="log__day">
    <h2>{{ dateFormatted }}</h2>
    <span class="nutrient">Calories: {{ calories }}</span>
    Macros: {{ fatPct }} / {{ carbsPct }} / {{ proteinPct }}
    <!--<span class="nutrient">{{ carbs }}g carbs</span>-->
    <!--<span class="nutrient">{{ fat }}g fat</span>-->
    <!--<span class="nutrient">{{ protein }}g protein</span>-->
    <entry-list :entries="dataDay.entries"></entry-list>
  </div>
</template>

<script>
import * as API from '../../api'
import { roundTo } from '../../store/util'
import store from '../../store'
import EntryList from './EntryList'

export default {
  props: ['dataDay', 'date'],
  data() {
    return {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      usdaNutrients: ['208', '204', '205', '203'],
    }
  },
  components: { EntryList },
  created() {
    const entries = this.dataDay.entries

    entries.forEach((entry) => {
      let nutrients

      let calories
      let nEnergy

      let fat
      let nFat

      let carbs
      let nCarbs

      let protein
      let nProtein

      if (!store.state.log.entries[entry]) return
      const entryData = store.state.log.entries[entry]

      if (!entryData || !entryData.foodUUID) return
      const food = store.state.foodCache.food[entryData.foodUUID]

      switch (food.source) {
        case API.USDA:
          nutrients = food.dataFood.nutrients

          nEnergy = nutrients.find(n => n.nutrient_id === '208')
          calories = parseInt(nEnergy.value, 10) * (entryData.mass / 100)

          nFat = nutrients.find(n => n.nutrient_id === '204')
          fat = parseInt(nFat.value, 10) * (entryData.mass / 100)

          nCarbs = nutrients.find(n => n.nutrient_id === '205')
          carbs = parseInt(nCarbs.value, 10) * (entryData.mass / 100)

          nProtein = nutrients.find(n => n.nutrient_id === '203')
          protein = parseInt(nProtein.value, 10) * (entryData.mass / 100)
          break
        default: console.error('Unsupported source')
          return
      }

      this.calories += calories
      this.fat += fat
      this.carbs += carbs
      this.protein += protein
    })
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
    dateFormatted() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const parsed = new Date(Date.parse(this.date))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}, ${parsed.getFullYear()}`

      return formatted
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
</style>