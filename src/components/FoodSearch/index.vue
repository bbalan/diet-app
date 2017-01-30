<template>
  <div id="FoodSearch">
    <h1>Food search</h1>
    <form @submit.prevent>
      <label for="searchText">Search USDA foods:</label>
      <input type="text" name="searchText" v-model="searchText" @focus="onSearchFocus">

      <search-result-list 
        v-if="isSearchBarFocused"
        :searchText="searchText"
        :list="searchResults" 
        @eventSelectItem="onSelectItem">
      </search-result-list>

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
import { USDAfoodReport as foodReport, USDAsearch as search } from '../../api'
import SearchResultList from './SearchResultList'
import FoodItem from '../FoodItem'

export default {
  components: {
    SearchResultList,
    FoodItem,
  },
  data() {
    return {
      searchText: '',
      isSearchBarFocused: false,
      searchResults: null,
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
      fetch(foodReport(item.ndbno))
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

      if (text === '' || text === undefined) {
        that.searchResults = ''
      } else {
        fetch(search(text))
          .then(checkStatus)
          .then(parseJSON)
          .then((json) => {
            const list = json.list

            if (list !== undefined) {
              that.searchResults = list.item
            } else {
              that.searchResults = []
            }
          })
          .catch((error) => {
            that.searchResults = []
            console.error('request failed', error)
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
