<template>
  <div id="FoodSearch">
    <h1>Food search</h1>
    <form @submit.prevent>
      <label for="searchText">Search foods:</label>
      <input type="text" name="searchText" v-model="searchText" @focus="onSearchFocus">

      <!--<pre>{{ searchResults }}</pre>-->

      <result-list 
        v-if="isSearchBarFocused"
        :searchText="searchText"
        :list="searchResults" 
        @eventSelectItem="onSelectItem">
      </result-list>

      <food-item 
        v-if="!isSearchBarFocused"
        :foodData="foodData">
      </food-item>
      
    </form>
  </div>
</template>

<script>
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import { checkStatus, parseJSON } from '../../api'
import { usdaFoodReport, usdaSearch } from '../../api/USDA'
import { otherFoodReport, otherSearch } from '../../api/other'
import ResultList from './ResultList'
import FoodItem from '../FoodItem'

export default {
  components: {
    ResultList,
    FoodItem,
  },
  data() {
    return {
      searchText: '',
      isSearchBarFocused: false,
      searchResults: [],
      foodData: null,
    }
  },
  watch: {
    // User typed something into the search field.
    searchText(text) {
      const sanitizedText = this.sanitizeSearch(text)
      this.getFoods(sanitizedText, this)
    },
  },
  methods: {
    sanitizeSearch(text) {
      return encodeURIComponent(text)
    },
    onSearchFocus() {
      this.isSearchBarFocused = true
    },
    onSearchBlur() {
      this.isSearchBarFocused = false
    },
    // User clicked a search result item.
    onSelectItem(item) {
      let foodReportAPI
      let reportHandler

      function usdaReportHandler(json) {
        this.foodData = json.report.food
      }

      function otherReportHandler(json) {
        console.error('Unsupported API - otherReportHandler()', json)
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
      .then((json) => {
        reportHandler(json)
        this.isSearchBarFocused = false
      })
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
        console.error('Unsupported API - otherSearchHandler()', json)
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
