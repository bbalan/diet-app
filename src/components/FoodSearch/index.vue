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
import { usdaFoodReport, usdaSearch } from '../../api'
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
    getFoods: debounce((text, that) => {
      // TODO: run analytics to determine how many searches done before an option is selected

      function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response
        }

        const error = new Error(response.statusText)
        error.response = response
        throw error
      }

      function parseJSON(response) {
        return response.json()
      }

      function search(searchText, source) {
        return fetch(usdaSearch(searchText, source))
        .then(checkStatus)
        .then(parseJSON)
        .then((json) => {
          const list = json.list

          if (list !== undefined && list.item !== undefined) {
            that.searchResultsTemp = that.searchResultsTemp.concat(list.item)
          }
        })
        .catch((error) => {
          console.error('request failed', error)
        })
      }

      if (text === '' || text === undefined) {
        that.searchResults = ''
      } else {
        const promises = []

        promises.push(search(text, 'Standard Reference'))
        // promises.push(search(text, 'Branded Food Products'))

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
