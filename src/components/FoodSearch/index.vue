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
import { /* otherFoodReport, */ otherSearch } from '../../api/other'
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
      searchResultsTemp: [],
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
      fetch(usdaFoodReport(item.ndbno))
        .then(response => response.json())
        .then((json) => {
          this.foodData = json.report.food
          this.isSearchBarFocused = false
        })
    },
    // Hit the search API for a list of foods that match the search field
    // we pass context as "that" because debounce() breaks "this" keyword
    getFoods: debounce((searchText, that) => {
      // TODO: run analytics to determine how many searches done before an option is selected

      // Append USDA search results to the total search results
      function usdaHandler(json) {
        const list = json.list

        if (list !== undefined && list.item !== undefined) {
          that.searchResultsTemp = that.searchResultsTemp.concat(list.item)
        }
      }

      function otherHandler(json) {
        // TODO: implement another API
        console.log(json)
      }

      // Do a search with a specific supported API
      function search(opts) {
        let searchAPI
        let dataHandler

        if (opts.source === 'USDA') {
          searchAPI = usdaSearch(opts.searchText, opts.library)
          dataHandler = usdaHandler
        } else {
          searchAPI = otherSearch(opts.searchText)
          dataHandler = otherHandler
        }

        return fetch(searchAPI)
          .then(checkStatus)
          .then(parseJSON)
          .then(dataHandler)
          .catch((error) => { console.error('Search failed', error) })
      }

      if (searchText === '' || searchText === undefined) {
        that.searchResults = ''
      } else {
        const promises = []

        promises.push(search({
          searchText,
          source: 'USDA',
          library: 'Standard Reference',
        }))
        // promises.push(search(search({
        //   searchText,
        //   source: 'USDA',
        //   library: 'Branded Food Products',
        // }))
        // promises.push(search(text, 'other'))

        Promise
          .all(promises)
          .then(() => {
            that.searchResults = that.searchResultsTemp
            that.searchResultsTemp = []
          })
      }
    }, 250),
  },
}
</script>

<style scoped lang="stylus">
#searchResults
  display block
  width 50%
</style>
