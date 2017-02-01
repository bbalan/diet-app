<template>
  <div class="searchResult" @click="onSelectItem()">

    <!--<pre>{{ searchData }}</pre>-->

    <span class="searchResult__add">+</span>
    <span class="searchResult__name">{{ searchData.name }}</span>

    <food-item :foodReport="foodReport"></food-item>
  </div>
</template>

<script>
import { USDA_API, OTHER_API } from '../../api'
import { checkStatus, parseJSON } from '../../api/util'
import { usdaFoodReport } from '../../api/USDA'
import { otherFoodReport } from '../../api/other'
import FoodItem from '../FoodItem'

export default {
  props: ['searchData'],
  data() {
    return {
      foodReport: null,
    }
  },
  components: { FoodItem },
  methods: {
    // User clicked a search result item.
    onSelectItem() {
      const item = this.searchData

      let foodReportAPI
      let reportHandler

      // Append source to the selected item
      function usdaReportHandler(json) {
        try {
          const foodReport = json.report.food
          foodReport.source = item.source
          this.foodReport = foodReport
        } catch (e) {
          console.error('Food report failed - ', e)
        }
      }

      function otherReportHandler(json) {
        console.error('Not implemented - reportHandler()', json)
      }

      switch (item.source) {
        case USDA_API:
          foodReportAPI = usdaFoodReport(item.ndbno)
          reportHandler = usdaReportHandler.bind(this)
          break
        case OTHER_API:
          foodReportAPI = otherFoodReport(item.id)
          reportHandler = otherReportHandler.bind(this)
          break
        default:
          console.error(`Unsupported source: "${item.source}`)
          return false
      }

      fetch(foodReportAPI)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        reportHandler(json)
        this.isSearchBarFocused = false
      })
      .catch((e) => { console.error('Food report failed', e) })

      return null
    },
  },
}
</script>

<style scoped lang="stylus">
.searchResult
  cursor pointer

  &:hover
    background #eee

  &:active
    background #efe
</style>
