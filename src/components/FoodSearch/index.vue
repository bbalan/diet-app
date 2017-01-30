<template>
  <div id="FoodSearch">
    <form @submit.prevent>
      <label for="searchText">Search USDA foods:</label>
      <input type="text" name="searchText" v-model="searchText">

      <food-item :data="foodData"></food-item>

      <search-result-list 
        :list="searchResults" 
        @eventSelectItem="onSelectItem">
      </search-result-list>
      
    </form>
  </div>
</template>

<script>
import { USDAfoodReport as foodReport, USDAsearch as search } from '../../api' 
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import SearchResultList from './SearchResultList'
import FoodItem from '../FoodItem'

export default {
  components: {
    SearchResultList,
    FoodItem,
  },
  data() {
    return {
      searchText: "",
      searchResults: null,
      foodData: null,
    }
  },
  watch: {
    // User typed something into the search field.
    searchText(text) {
      this.getFoods(text, this)
    },
  },
  methods: {
    // User clicked a search result item.
    onSelectItem(ndbno) {
      fetch(foodReport(ndbno))
        .then((response) => {
          return response.json()
        }).then((json) => {
          this.foodData = json.report.food
        })
    },
    // Hit the search API for a list of foods that match the search field
    // we pass context as "that" because debounce() breaks "this" keyword
    getFoods: debounce((text, that) => {
      // TODO: run analytics to determine how many searches done before an option is selected

      if(text == '' || text === undefined) {
        that.searchResults = ''
      } else {
        function checkStatus(response) {
          if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        }

        function parseJSON(response) {
          return response.json()
        }

        fetch(search(text))
          .then(checkStatus)
          .then(parseJSON)
          .then((json) => {
            const list = json.list

            if (list !== undefined) {
              that.searchResults = list.item
            } else {
              that.searchResults = null
            }
          }).catch(function(error) {
            that.searchResults = null
            console.error('request failed', error)
          })
      }
        
    }, 250)
  },
}
</script>

<style scoped lang="stylus">
#searchResults
  display block
  width 50%
</style>
