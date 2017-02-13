<template>
  <div class="resultList">

    <div v-if="list !== null && list.length > 0 && !!searchText">
      <!--<h2>{{list.length}} results</h2>-->
      <!--<span class="md-headline">{{list.length}} results</span>-->
      
      <ul class="link-list">
        <li 
          v-for="result in orderedList" class="md-subheading">
          <router-link 
            class="foodLink" 
            :to="`/food/new/${result.source}/${result.id}`">
            {{ result.name }}
          </router-link>
        </li>
        
        <li class="end-of-results">That's it!</li>
      </ul>
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
  position relative
  z-index 1
  a
    padding-left 56px

  ul
    padding 0
  li
    list-style-type none
    background white
    width 100%
    margin 0 !important
    .foodLink
      display block
      position relative
      padding-left 56px !important
      white-space nowrap
      color black !important
      text-decoration none !important
      padding 16px 0
      &:hover
        color 
      &:after
        pointer-events none
        display block
        content ''
        width 50px
        height 100%
        position absolute
        top 0
        right 0
        background linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)
    &.end-of-results
      padding-left 56px
      padding-top 32px
      color rgba(0,0,0,.5)
      border-top 1px solid #eee
      .md-list-item-container
        padding 0 !important
</style>
