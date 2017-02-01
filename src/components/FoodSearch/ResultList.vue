<template>
  <div class="resultList" v-if="list !== null">

    <div v-if="list.length > 0">
      <h2>{{list.length}} results</h2>
      
      <search-result 
        v-for="item in orderedList" 
        :name="item.name" 
        :ndbno="item.ndbno"
        @click.native="selectItem(item)">
      </search-result>
    </div>
    <div v-else v-if="searchText != ''">
      No results :(
    </div>
  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  props: ['list', 'searchText'],
  components: { SearchResult },
  methods: {
    selectItem(foodData) {
      this.$emit('eventSelectItem', foodData)
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

      this.list.forEach((item) => {
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
