<template>
  <div class="food-search page page--tabs">
    
    <form @submit.prevent="doSearch" class="grid__outer">

      <md-whiteframe 
        md-elevation="2"
        class="search-bar">

        <md-input-container class="search-bar__input" ref="searchBar">
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

      <div class="search-loader-container">
        <md-spinner v-if="loading && searchText.length" md-indeterminate class="search-loader"></md-spinner>
      </div>

      <result-list 
        :searchText="searchText" 
        :list="searchResults">
      </result-list>

      <div :class="{
        'no-results': true,
        'md-title': true,
        visible: didSearch && !loading && searchText.length && searchResults.length == 0,
      }">No results</div>

    </form>
  
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
// https://github.com/github/fetch
import 'whatwg-fetch'
// import debounce from 'lodash.debounce'
import * as API from 'api'
import * as USDA from 'api/USDA'
import * as OTHER from 'api/other'
import { checkStatus, parseJSON } from 'api/util'
import ResultList from './ResultList'

export default {
  name: 'FoodSearch',
  components: { ResultList },
  props: ['query'],
  data() {
    return {
      searchText: this.query,
      searchResults: [],
      dataFood: null,
      loading: false,
      didSearch: false,
      searchBar: null,
      stopTypingTimeout: null,
      debounce: 500,
    }
  },
  mounted() {
    // Do a search with searchText from router params
    if (this.searchText) {
      this.doSearch(this.sanitizedSearch)
    }

    // Focus the search bar and add classes
    this.searchBar = this.$refs.searchBar.$el
    const input = this.searchBar.querySelector('input')

    if (input) {
      input.focus()
      input.select()
      setTimeout(() => { this.searchBar.classList.add('md-input-focused') }, 100)
    }
  },
  watch: {
    // User typed something into the search field.
    searchText() {
      // this.doSearch(this.sanitizedSearch)
      this.stopTypingTimeout = clearTimeout(this.stopTypingTimeout)
      this.stopTypingTimeout = setTimeout(() => {
        this.doSearch(this.sanitizedSearch)
      }, 250)
    },
  },
  computed: {
    sanitizedSearch() {
      return encodeURIComponent(this.searchText)
    },
  },
  methods: {
    doSearch(text) {
      this.didSearch = false

      if (!this.tryCachedResults(text)) {
        this.searchAllAPIs(this.sanitizedSearch, this)
      }
    },
    tryCachedResults(text) {
      const cachedResults = store.state.search.history

      if (Object.hasOwnProperty.call(cachedResults, text)) {
        this.searchResults = cachedResults[text]
        return true
      }

      return false
    },
    // Hit the search API for a list of foods that match the search field
    // we pass context as "that" because debounce() breaks "this" keyword
    searchAllAPIs(searchText) {
      router.replace(`/food/search/${searchText}`)

      // TODO: run analytics to determine how many searches done before an option is selected
      // TODO: add search term to router URL so hitting back will go back to previous search

      if (searchText === '' || searchText === undefined) {
        this.searchResults = []
        this.loading = false
        this.didSearch = false
        return
      }

      this.loading = true
      this.didSearch = true
      let resultsTemp = []

      const loadComplete = (function f() {
        this.loading = false
        store.commit('search/setSearchResults', {
          query: this.searchText,
          results: this.searchResults,
        })
      }).bind(this)

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

      // Append results from API.USA
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
          this.searchResults = resultsTemp
        })
        .then(loadComplete)
    },
    onClear() {
      this.searchText = ''
      this.searchBar.classList.remove('md-has-value')
      this.searchBar.querySelector('input').focus()
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
  max-height 100%
  max-width 100%
.search-loader-container
  pointer-events none
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  box-sizing border-box
  border-top 70px solid transparent
  z-index 1
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
  background white
  box-sizing border-box
  min-height 48px
  padding 8px 16px
  border-radius 2px
  line-height 0
  /*position absolute !important*/
  width 100%
  z-index 2 !important

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
      cursor pointer

  .md-input
    color rgba(0,0,0,.54) !important

  .md-input-focused
    color black !important
    i.md-icon
      color rgba(0,0,0,.54) !important

  .md-has-value
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
