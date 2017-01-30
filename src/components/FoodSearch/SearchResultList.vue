<template>
  <div class="searchResultList" v-if="list !== null">
    <h2>{{list.length}} results</h2>

    <search-result 
      v-for="item in orderedList" 
      :name="item.name" 
      :ndbno="item.ndbno"
      @click.native="selectItem(item)">
    </search-result>
  </div>
</template>

<script>
import SearchResult from './SearchResult'

// TODO: order list by something more sensible
export default {
  props: ['list', 'searchText'],
  data() {
    return {
      orderedList: null,
    }
  },
  components: { SearchResult },
  methods: {
    selectItem(foodData) {
      this.$emit('eventSelectItem', foodData)
    },
  },
  watch: {
    /* Sort list alphabetically, except items with searchText at
    the beginning of their names float to the top */
    list(data) {
      if (data === null) return

      this.orderedList = data.slice().sort((a, b) => {
        const text = this.searchText.toLowerCase().split(' ')[0]
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        const aPos = aName.indexOf(text)
        const bPos = bName.indexOf(text)

        let returnVal = 0

        if (aPos === 0 || bPos === 0) {
          // First, sort by position of search text
          if (aPos > bPos) {
            returnVal = 1
          } else if (aPos < bPos) {
            returnVal = -1
          }
        } else if (aName > bName) {
          returnVal = 1
        } else if (aName < bName) {
          returnVal = -1
        }

        return returnVal
      })
    },
  },
}
</script>

<style scoped>

</style>
