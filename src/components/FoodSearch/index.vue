<template>
  <div id="FoodSearch">
    <h1>Food search</h1>
    <form @submit.prevent>
      <label for="searchText">Search foods:</label>
      <input type="text" name="searchText" v-model="searchText">

      <!--<pre>{{ searchResults }}</pre>-->

      <result-list 
        :searchText="searchText"
        :list="searchResults" 
        @eventResultSelect="onResultSelect">
      </result-list>
      
    </form>
  </div>
</template>

<script>
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import { checkStatus, parseJSON } from '../../api/util'
import { usdaFoodReport, usdaSearch } from '../../api/USDA'
import { otherFoodReport, otherSearch } from '../../api/other'
import ResultList from './ResultList'
import FoodItem from '../FoodItem'

export default {
  name: 'FoodSearch',
  components: {
    ResultList,
    FoodItem,
  },
  data() {
    return {
      searchText: '',
      searchResults: [],
      foodData: null,
    }
  },
  computed: {
    sanitizedSearch() {
      return encodeURIComponent(this.searchText)
    },
  },
  watch: {
    // User typed something into the search field.
    searchText() {
      this.getFoods(this.sanitizedSearch, this)
    },
  },
  methods: {
    // User clicked a search result item.
    onResultSelect(item) {
      let foodReportAPI
      let reportHandler

      // Append source to the selected item
      function usdaReportHandler(json) {
        try {
          const foodData = json.report.food
          foodData.source = item.source
        } catch (e) {
          console.error('Food report failed - ', e)
        }
      }

      function otherReportHandler(json) {
        console.error('Not implemented - reportHandler()', json)
      }

      if (item.source === 'USDA') {
        foodReportAPI = usdaFoodReport(item.ndbno)
        reportHandler = usdaReportHandler.bind(this)
      } else {
        foodReportAPI = otherFoodReport(item.id)
        reportHandler = otherReportHandler.bind(this)
      }

      fetch(foodReportAPI)
      .then(parseJSON)
      .then(reportHandler)
      .catch((error) => { console.error('Food report failed', error) })
    },
    // Hit the search API for a list of foods that match the search field
    // we pass context as "that" because debounce() breaks "this" keyword
    getFoods: debounce((searchText, that) => {
      // TODO: run analytics to determine how many searches done before an option is selected
      if (searchText === '' || searchText === undefined) {
        that.searchResults = []
        return
      }

      let resultsTemp = []

      // Append USDA search results to the total search results
      function usdaSearchHandler(json) {
        if (json.list !== undefined && json.list.item !== undefined) {
          const results = json.list.item
          results.forEach((result) => { result.source = 'USDA' })
          resultsTemp = resultsTemp.concat(results)
        }
      }

      // Append search results from generic API to total search results
      function otherSearchHandler(json) {
        console.error('Not implemented - searchHandler()', json)
      }

      // Do a search with a specific supported API
      function search(opts) {
        let searchAPI
        let searchHandler

        if (opts.source === 'USDA') {
          searchAPI = usdaSearch(opts.searchText, opts.library)
          searchHandler = usdaSearchHandler
        } else {
          searchAPI = otherSearch(opts.searchText)
          searchHandler = otherSearchHandler
        }

        return fetch(searchAPI)
          .then(checkStatus)
          .then(parseJSON)
          .then(searchHandler)
          .catch((error) => { console.error('Search failed', error) })
      }

      const searches = []

      searches.push(search({
        searchText,
        source: 'USDA',
        library: 'Standard Reference',
      }))

      // searches.push(search({
      //   searchText,
      //   source: 'USDA',
      //   library: 'Branded Food Products',
      // }))

      // searches.push(search({
      //   searchText,
      //   source: 'otherAPI',
      // }))

      // Execute all searches
      Promise
        .all(searches)
        .then(() => {
          that.searchResults = resultsTemp
        })
    }, 250),
  },
}
</script>

<style scoped lang="stylus">
#searchResults
  display block
  width 50%
</style>
