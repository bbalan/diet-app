<template>
  <div class="resultList">

    <div v-if="list !== null && list.length > 0">
      <h2>{{list.length}} results</h2>
      
      <search-result 
        v-for="item in orderedList" 
        :searchResultData="item"
        :enabled="!isResultSelected"
        @eventResultSelect="onResultSelect"
        @eventResultClose="onResultClose"> 
      </search-result>
    </div>

    <div v-else>
      <div v-if="searchText != ''">
        No results :(
      </div>
    </div>

  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  /* Normally, a list of search results shouldn't know about the
  search text, but in this case we need it for sorting */
  props: ['list', 'searchText'],
  components: { SearchResult },
  data() {
    return {
      isResultSelected: false,
    }
  },
  methods: {
    onResultSelect() {
      // TODO: hide other search results
      console.log('onResultSelect')
      this.isResultSelected = true
    },
    onResultClose() {
      console.log('onResultClose')
      this.isResultSelected = false
    },
  },
  computed: {
    /* Sort list alphabetically, except items with searchText at
    the beginning of their names float to the top */
    orderedList() {
      if (this.list === null) return null

      const text = this.searchText.toLowerCase().split(' ')[0]
      const startsWithText = []
      const doesntStartWithText = []

      let resultID = 0

      this.list.forEach((item) => {
        item.id = resultID
        resultID += 1

        if (item.name.toLowerCase().indexOf(text) === 0) {
          startsWithText.push(item)
        } else {
          doesntStartWithText.push(item)
        }
      })

      doesntStartWithText.sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()

        if (aName > bName) return 1
        if (aName < bName) return -1
        return 0
      })

      return startsWithText.concat(doesntStartWithText)
    },
  },
}
</script>

<style scoped>

</style>
