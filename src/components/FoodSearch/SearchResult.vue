<template>
  <div class="searchResult" @click="onResultSelect()">

    <button 
      v-if="foodReport != null" 
      @click.stop="onResultClose" 
      class="searchResult__close">
      X
    </button>

    <span class="searchResult__name">{{ searchResultData.name }}</span>

    <food-item 
      v-if="foodReport != null" 
      :foodReport="foodReport">
    </food-item>
  </div>
</template>

<script>
import { USDA_API, OTHER_API } from '../../api'
import { checkStatus, parseJSON } from '../../api/util'
import { usdaFoodReport } from '../../api/USDA'
import { otherFoodReport } from '../../api/other'
import FoodItem from '../FoodItem'

export default {
  props: ['searchResultData', 'enabled'],
  data() {
    return {
      foodReport: null,
    }
  },
  components: { FoodItem },
  methods: {
    onResultClose() {
      this.foodReport = null
      this.$emit('eventResultClose')
    },
    // User clicked a search result item.
    onResultSelect() {
      if (!this.enabled) return

      const item = this.searchResultData

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
          return
      }

      fetch(foodReportAPI)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        reportHandler(json)
      })
      .catch((e) => { console.error('Food report failed', e) })

      this.$emit('eventResultSelect', this.searchResultData.id)

      return
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
