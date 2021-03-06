<template>
  <transition name="fade">
    <div class="resultList" v-if="list !== null && list.length > 0 && !!searchText">

      <md-list class="link-list md-double-line">
        <md-list-item
          v-for="result in orderedList"
          v-if="containsSearchText(result.name)"
          class="md-subheading">
          <router-link
            class="foodLink wordwrap--fade"
            :to="{
              name: 'addFood',
              params: {
                source: result.source,
                id: result.id,
                isForRecipe: isForRecipe,
              },
            }">
            <span class="foodLink__name">{{ result.name }}</span>
          </router-link>
        </md-list-item>

        <md-list-item class="end-of-results">
          Found {{ orderedList.length }} food {{ orderedList.length == 1 ? 'item' : 'items' }}
        </md-list-item>

      </md-list>
    </div>
  </transition>
</template>

<script>
/**
 * This component displays search results from the searchBar.
 */
import FoodLink from './FoodLink'

export default {
  /* Normally, a list of search results shouldn't know about the
  search text, but in this case we need it for sorting */
  props: ['list', 'searchText'],
  components: { FoodLink },
  computed: {
    // Sort list by several criteria, primarily how close to the start the searchText appears
    // TODO: split search terms before sorting
    orderedList() {
      return this.list.slice().sort((a, b) => {
        const terms = this.searchText.toLowerCase().split(' ')
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        const aPos = terms.map(term => aName.indexOf(term))
        const bPos = terms.map(term => bName.indexOf(term))
        const searchDepth = 10 // how far into the search result to stop looking

        // Does the search term even exist in the string?
        for (let i = 0; i < aPos.length; i += 1) {
          if (aPos[i] < 0 && bPos[i] >= 0) return 1
          if (aPos[i] >= 0 && bPos[i] < 0) return -1

          // Search term is too deep inside string
          if (aPos[i] >= searchDepth && bPos[i] >= searchDepth) {
            // Sort alphabetically
            if (aName < bName) return -1
            if (aName > bName) return 1
          }

          // How close to the beginning of the string is the searchText located?
          if (aPos[i] < bPos[i]) return -1
          if (aPos[i] > bPos[i]) return 1
          if (aPos[i] === bPos[i]) {
            // How short is the result string?
            if (aName.length > b.name.length) return 1
            if (aName.length < b.name.length) return -1

            // Sort alphabetically
            // if (aName < bName) return -1
            // if (aName > bName) return 1
          }
        }

        return 0 // Strings are roughly equivalent
      })
    },

    // What purpose the search result is for (log or recipe)
    isForRecipe() {
      return this.$route.name === 'searchRecipe'
    },
  },
  methods: {
    // Whether this result contains the searchText at all
    containsSearchText(str) {
      // return str.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
      return str
    },
  },
}
</script>

<style lang="stylus">
.resultList
  width 100%
  height 100%
  overflow-x hidden
  overflow-y scroll
  position relative
  z-index 1

  ul
    padding 0
    margin 0

  .md-list-item
    list-style-type none
    background white
    width 100%
    margin 0 !important
    box-sizing border-box
    overflow hidden
    text-overflow ellipsis
    max-height 72px
    display table

    a
      display table-row
      width 100%
      line-height 1.3em
      position relative
      color black !important
      text-decoration none !important
      white-space normal !important
      text-overflow ellipsis
      overflow hidden
      padding 0 !important
      max-height 100%

      span
        display table-cell
        padding 16px 16px 16px 72px !important
        height 100%
        overflow hidden
        vertical-align middle
    &.end-of-results
      padding 16px 16px 16px 72px !important
      max-height 82px
      margin-top 16px !important
      color rgba(0,0,0,.5)
      border-top 1px solid #eee
      .md-list-item-container
        padding 0 !important
</style>
