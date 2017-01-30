<template>
  <div id="FoodSearch">
    <form>
      <label for="searchText">Search USDA foods:</label>
      <input type="text" v-model="searchText" name="searchText">

      <food-item :data="selectedItem"></food-item>

      <search-result-list 
        :list="items" 
        @eventSelectItem="onSelectItem">
      </search-result-list>
      
    </form>
  </div>
</template>

<script>
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import SearchResultList from './SearchResultList'
import FoodItem from '../FoodItem'

function searchAPI(query, format = 'json', sort = 'n', max = 100, offset = 0, ds = 'Standard Reference') {
  return `http://api.nal.usda.gov/ndb/search/?format=${format}&sort=${sort}&max=${max}&offset=${offset}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe&q=${query}&ds=${ds}`
}

function foodReportAPI(ndbno, type = 'b', format = 'json') {
  return `http://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=${type}&format=${format}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe`
}

export default {
  components: {
    SearchResultList,
    FoodItem,
  },
  data() {
    return {
      searchText: null,
      items: null,
      selectedItem: null,
    };
  },
  watch: {
    searchText(text) {
      this.getFoods(text, this)
    },
  },
  methods: {
    onSelectItem(ndbno) {
      fetch(foodReportAPI(ndbno))
        .then((response) => {
          return response.json()
        }).then((json) => {
          this.selectedItem = json.report.food
        })
    },
    getFoods: debounce((text, context) => {
      // TODO: run analytics to determine how many searches done before an option is selected
      fetch(searchAPI(text))
        .then((response) => {
          return response.json()
        }).then((json) => {
          context.ajaxResult = json
          const list = json.list

          if (list !== undefined) {
            context.items = list.item
          } else {
            context.items = null
          }
        })

      // TODO: error handling

      // function checkStatus(response) {
      //   if (response.status >= 200 && response.status < 300) {
      //     return response
      //   } else {
      //     var error = new Error(response.statusText)
      //     error.response = response
      //     throw error
      //   }
      // }

      // function parseJSON(response) {
      //   return response.json()
      // }

      // fetch('/users')
      //   .then(checkStatus)
      //   .then(parseJSON)
      //   .then(function(data) {
      //     console.log('request succeeded with JSON response', data)
      //   }).catch(function(error) {
      //     console.log('request failed', error)
      //   })
        
    }, 250)
  },
}
</script>

<style scoped lang="stylus">
#searchResults
  display block
  width 50%
</style>
