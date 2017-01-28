<template>
  <div id="FoodSearch">
    <form>
      <label for="searchText">Search USDA foods:</label>
      <input type="text" v-model="searchText" name="searchText">
    </form>
    <h2>Results</h2>
    <hr/>
    <pre>
      {{ result }}
    </pre>
  </div>
</template>

<script>
import store from '../../store'
import debounce from 'lodash.debounce'
import 'whatwg-fetch' // https://github.com/github/fetch

function composeAPI(query, format = 'json', sort = 'n', max = 25, offset = 0, ds = 'Standard Reference') {
  return `http://api.nal.usda.gov/ndb/search/?format=${format}&sort=${sort}&max=${max}&offset=${offset}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe&q=${query}&ds=${ds}`
}

export default {
  data() {
    return {
      searchText: null,
      result: null,
    };
  },
  watch: {
    searchText(text) {
      this.result = this.getFoods(text, this)
    },
  },
  methods: {
    getFoods: debounce((text, context) => {
      // TODO: run analytics to determine how many searches done before an option is selected
      const apiUrl = composeAPI(text)

      fetch(apiUrl)
        .then((response) => {
          return response.text()
        }).then((text) => {
          context.result = text
        })

      // TODO: error handling
        
    }, 250)
  },
}
</script>

<style scoped>

</style>
