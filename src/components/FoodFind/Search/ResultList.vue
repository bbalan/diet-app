<template>
  <div class="resultList">

    <div v-if="list !== null && list.length > 0 && !!searchText">
      <!--<h2>{{list.length}} results</h2>-->
      <!--<span class="md-headline">{{list.length}} results</span>-->
      
      <md-list class="link-list">
        <md-list-item 
          v-for="result in orderedList">
          <router-link 
            class="foodLink" 
            :to="`/food/new/${result.source}/${result.id}`">
            {{ result.name }}
          </router-link>
        </md-list-item>
        
        <md-list-item class="end-of-results">End of results</md-list-item>
      </md-list>
    </div>

  </div>
</template>

<script>
import FoodLink from './FoodLink'

export default {
  /* Normally, a list of search results shouldn't know about the
  search text, but in this case we need it for sorting */
  props: ['list', 'searchText'],
  components: { FoodLink },
  computed: {
    /* Sort list alphabetically, except items with searchText at
    the beginning of their names float to the top */
    orderedList() {
      if (this.list === null || !this.searchText) return null

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

<style lang="stylus">
.resultList
  padding-top 0
  width 100%
  height 100%
  overflow-x hidden
  overflow-y scroll
  padding-bottom 48px
  a
    padding-left 56px

  .md-list-item
    .md-list-item-container
      padding-left 56px !important
    &.end-of-results
      padding-left 56px
      padding-top 32px
      color rgba(0,0,0,.5)
      border-top 1px solid #eee
      .md-list-item-container
        padding 0 !important
</style>
