<template>
  <div id="FoodSearch">
    
    <h1>Food search</h1>

    <form @submit.prevent>
      <label for="searchText">Search foods:</label>
      <input type="text" name="searchText" v-model="searchText">

      <result-list 
        :searchText="searchText" 
        :list="searchResults">
      </result-list>
    </form>
    
  </div>
</template>

<script>
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import * as API from '../../api'
import * as USDA from '../../api/USDA'
import * as OTHER from '../../api/other'
import { checkStatus, parseJSON } from '../../api/util'
import ResultList from './ResultList'
import Food from '../Food'

export default {
  name: 'FoodSearch',
  components: {
    ResultList,
    Food,
  },
  data() {
    return {
      searchText: '',
      searchResults: [],
      dataFood: null,
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
      this.searchAllAPIs(this.sanitizedSearch, this)
    },
  },
  methods: {
    // Hit the search API for a list of foods that match the search field
    // we pass context as "that" because debounce() breaks "this" keyword
    searchAllAPIs: debounce((searchText, that) => {
      // TODO: run analytics to determine how many searches done before an option is selected

      if (searchText === '' || searchText === undefined) {
        that.searchResults = []
        return
      }

      let resultsTemp = []

      // Append USDA search results to the total search results
      function usdaSearchHandler(json) {
        if (json.list !== undefined && json.list.item !== undefined) {
          const results = json.list.item.map(result => ({
            name: result.name,
            id: result.ndbno,
            source: API.USDA,
          }))
          resultsTemp = resultsTemp.concat(results)
        }
      }

      // Append search results from generic API to total search results
      function otherSearchHandler(json) {
        console.error('Not implemented - searchHandler()', json)
      }

      // Do a search with a specific supported API
      function searchWithAPI(opts) {
        let searchAPI
        let searchHandler

        switch (opts.source) {
          case API.USDA:
            searchAPI = USDA.search(opts.searchText, opts.library)
            searchHandler = usdaSearchHandler
            break
          case API.OTHER:
            searchAPI = OTHER.search(opts.searchText)
            searchHandler = otherSearchHandler
            break
          default:
            return false
        }

        return fetch(searchAPI)
          .then(checkStatus)
          .then(parseJSON)
          .then(searchHandler)
          .catch((error) => { console.error('Search failed', error) })
      }

      const searches = []

      searches.push(searchWithAPI({
        searchText,
        source: API.USDA,
        library: 'Standard Reference',
      }))

      // searches.push(search({
      //   searchText,
      //   source: API.USDA,
      //   library: 'Branded Food Products',
      // }))

      // searches.push(search({
      //   searchText,
      //   source: API.OTHER,
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
