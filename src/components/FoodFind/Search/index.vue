<template>
  <div class="food-search">
    
    <form @submit.prevent class="grid__outer">

      <md-whiteframe 
        md-elevation="2"
        class="search-bar">

        <md-input-container class="search-bar__input">
          <md-icon class="search">search</md-icon>
          <md-icon class="arrow_back" @click.native="onClear">arrow_back</md-icon>
          <md-input 
            placeholder="Food name" 
            v-model="searchText">
          </md-input>
        </md-input-container>

        <!--<md-icon v-if="searchText" @click="onClear" class="clear">close</md-icon>-->

        <!-- TODO: make this work -->
        <md-list v-if="false" class="search-bar__result-list">
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
          <md-list-item>
            <md-icon>access_time</md-icon>
            <span>Past search</span>
          </md-list-item>
        </md-list>
      </md-whiteframe>

      <md-spinner v-if="loading && searchText.length" md-indeterminate class="search-loader"></md-spinner>

      <result-list 
        :searchText="searchText" 
        :list="searchResults">
      </result-list>

      <div :class="{
        'no-results': true,
        'md-title': true,
        visible: didSearch && !loading && searchText.length && searchResults.length == 0,
      }">{{ loading }} No results</div>

    </form>
  
  </div>
</template>

<script>
// https://github.com/github/fetch
import 'whatwg-fetch'
import debounce from 'lodash.debounce'
import * as API from 'api'
import * as USDA from 'api/USDA'
import * as OTHER from 'api/other'
import { checkStatus, parseJSON } from 'api/util'
import ResultList from './ResultList'

export default {
  name: 'FoodSearch',
  components: { ResultList },
  data() {
    return {
      searchText: '',
      searchResults: [],
      dataFood: null,
      loading: false,
      didSearch: false,
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
      // TODO: add search term to router URL so hitting back will go back to previous search

      if (searchText === '' || searchText === undefined) {
        that.searchResults = []
        that.loading = false
        return
      }

      that.loading = true
      that.didSearch = true
      let resultsTemp = []

      function loadComplete() {
        that.loading = false
        that.didSearch = false
      }

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
      function otherSearchHandler(/* json */) {
        // Not implemented
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
          .catch(error => error)
      }

      const searches = []

      searches.push(searchWithAPI({
        searchText,
        source: API.USDA,
        library: 'Standard Reference',
      }))

      // How to implement other APIs

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
        .then(loadComplete)
    }, 250),
    onClear() {
      this.searchText = ''
    },
  },
}
</script>

<style lang="stylus">
.food-search
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  padding-top 112px
  box-sizing border-box
  overflow hidden
  form
    position relative
    height 100%
.clear
  position absolute
  right 8px
  top 8px
  cursor pointer
.search-loader
  position absolute !important
  top 50%
  left 50%
  margin-top -25px
  margin-left -25px
.no-results
  position absolute
  top 50%
  width 100%
  margin-top -10px
  margin-left -16px
  color rgba(0,0,0,.5)
  text-align center
  opacity 0
  transition opacity 0.2s
  &.visible
    opacity 1
.search-bar
  box-sizing border-box
  min-height 48px
  padding 8px 16px
  border-radius 2px
  line-height 0
  /*position absolute !important*/
  width 100%

  &__result-list
    padding-bottom 0 !important

    .md-list-item
      &-container
        padding 0 !important
        .md-icon
          margin-right 16px !important
          opacity 0.5

  i.md-icon
    transition all 0.2s
    color rgba(0,0,0,.54)
    &.search
      opacity 1
    &.arrow_back
      opacity 0
      position absolute
      left 0

  .md-input-focused
    i.md-icon
      color rgba(0,0,0,.54) !important
      &.search
        opacity 0
      &.arrow_back
        opacity 1

  &__input
    position relative
    padding 0 !important
    margin 0 !important
    min-height auto !important

    input
      margin-left 16px !important
      transition all 0s !important

    &:after
      display none
</style>
