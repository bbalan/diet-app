<template>
  <div class="toolbar__search">
    <transition name="fade">
      <md-button
        v-if="searchEnabled"
        class="md-icon-button toolbar__search__toggle"
        @click.native="open">
        <md-icon>search</md-icon>
      </md-button>
    </transition>

    <transition name="fade">
      <div class="toolbar__search__bar" v-if="isOpen">
        <form @submit.prevent="submit">
          <input
            ref="searchBar"
            type="text"
            :placeholder="placeholder"
            v-model="searchText"
            @keyup="onKeyUp"
            @focus="onFocus"
            @click="onFocus">
        </form>

        <!-- TODO: previous searches -->

        <transition name="fade">
          <md-button
            v-if="searchText"
            class="md-icon-button toolbar__search__clear"
            @click.native="clear">
            <md-icon>close</md-icon>
          </md-button>
        </transition>

        <md-button
          class="md-icon-button toolbar__search__back"
          @click.native="goBack">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </transition>

    <transition name="fade">
      <div class="toolbar__search__overlay" v-if="showOverlay" @click="close"></div>
    </transition>
  </div>
</template>

<script>
import router from 'router'

export default {
  name: 'SearchBar',
  data() {
    return {
      isOpen: false,
      searchText: '',
      inputEl: null,
    }
  },
  mounted() {
    this.onRouteChange()
  },
  computed: {
    searchEnabled() { return this.$route.meta.search },
    isEntryRecipe() { return this.$route.name === 'entryRecipe' },
    isSearchStandard() { return this.$route.name === 'search' },
    isSearchRecipe() { return this.$route.name === 'searchRecipe' },
    isSearchAny() { return this.isSearchStandard || this.isSearchRecipe },
    query() { return this.$route.params.query },
    hasQuery() { return !!this.query },
    placeholder() { return `Search ${this.isSearchRecipe || this.isEntryRecipe ? 'ingredients' : 'foods'}` },
    showOverlay() { return this.isOpen && !this.isSearchAny },
  },
  methods: {
    open() {
      this.isOpen = true
      this.focus()
    },
    close() {
      this.isOpen = false
      this.clear()
    },
    goBack() {
      this.close()
      if (this.isSearchAny) router.go(-1)
    },
    clear() {
      this.searchText = ''
    },
    focus() {
      setTimeout(() => { this.$el.querySelector('input').focus() }, 100)
    },
    // Select search bar text on focus
    onFocus() {
      this.$el.querySelector('input').select()
    },
    blur() {
      setTimeout(() => { this.$el.querySelector('input').blur() }, 100)
    },
    // Clear search bar text and close on blur
    onBlur() {
      if (!this.isSearchAny) {
        this.searchText = ''
        this.close()
      }
    },
    submit() {
      if (this.isSearchStandard || this.isSearchRecipe) {
        router.replace({ name: this.$route.name, params: { query: this.searchText } })
      } else if (this.isEntryRecipe) {
        router.push({ name: 'searchRecipe', params: { query: this.searchText } })
      } else {
        router.push({ name: 'search', params: { query: this.searchText } })
      }

      this.$refs.searchBar.blur()
    },
    onRouteChange() {
      if (this.isSearchAny) {
        this.isOpen = true
        this.searchText = this.query
        this.blur()

        if (this.isSearchRecipe && !this.hasQuery) this.focus()
      } else {
        this.isOpen = false
      }
    },
    onKeyUp(e) {
      if (e.key === 'Enter') this.submit()
    },
  },
  watch: {
    $route() {
      this.onRouteChange()
    },
  },
}
</script>

<style scoped lang="stylus">
.toolbar__search
  position absolute
  top 0
  left 0
  width 100%
  height 0

  &__overlay
    background rgba(0,0,0,.54)
    width 9000px
    height 9000px
    position absolute
    top 0
    left -4500px

  &__toggle
    position absolute !important
    top 8px
    right 8px
    left auto

  &__clear
  &__back
    position absolute
    top 8px
    right 8px
    z-index 2

    .md-icon
      color rgba(0,0,0,.54)

  &__back
    right auto
    left 0

  &__bar
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index 1

    input
      width 100%
      height 56px
      padding 17px 8px 15px 72px
      background white
      border none
      font-size 20px
      font-weight 400
      outline none
</style>