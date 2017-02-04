<template>
  <div class="log__day" v-if="filteredEntries.length > 0">
    <h2>{{ dateFormatted }}</h2>
    <span class="nutrient">Calories: {{ calories }}</span>
    Macros: {{ fatPct }} / {{ carbsPct }} / {{ proteinPct }}
    <!--<span class="nutrient">{{ carbs }}g carbs</span>-->
    <!--<span class="nutrient">{{ fat }}g fat</span>-->
    <!--<span class="nutrient">{{ protein }}g protein</span>-->
    <entry-list :entries="filteredEntries"></entry-list>
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
    this.calculateMacros()
  },
  methods: {
    calculateMacros() {
      const entries = this.dataDay.entries

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
    // Filter only keys that match a value in store.state.log.entries
    filteredEntries() {
      return this.dataDay.entries.filter(
        entryUUID => store.state.log.entries[entryUUID]
      )
    },
  },
}
</script>

<style scoped lang="stylus">
.nutrient
  margin-right 20px
</style>