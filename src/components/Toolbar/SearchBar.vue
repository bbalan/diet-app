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
            type="text" 
            placeholder="Search foods" 
            v-model="searchText"
            @keyup="onKeyUp"
            @blur="onBlur"
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
      searchTextLast: '',
      inputEl: null,
    }
  },
  computed: {
    searchEnabled() { return this.$route.meta.search },
  },
  mounted() {
    this.onRouteChange()
  },
  watch: {
    $route() {
      this.onRouteChange()
    },
    isOpen(open) {
      if (open) {
        // this.focus()
      } else {
        this.searchText = ''
      }
    },
    // searchText() {
    //   this.onSearchText()
    // },
  },
  methods: {
    open() {
      this.isOpen = true
      this.focus()
    },
    close() { this.isOpen = false },
    goBack() {
      this.close()
      if (this.$route.name === 'search') router.go(-1)
    },
    clear() {
      this.searchText = ''
      this.isOpen = true
      this.focus()
    },
    focus() {
      this.isOpen = true
      setTimeout(() => { this.$el.querySelector('input').focus() }, 100)
    },
    submit() {
      this.searchTextLast = this.searchText
      router.push({ name: 'search', params: { query: this.searchText } })
    },
    onFocus() {
      // this.$el.querySelector('input').select()
      this.searchText = ''
    },
    onBlur() {
      if (this.$route.name !== 'search') {
        this.searchText = ''
        this.close()
      } else {
        this.searchText = this.searchTextLast
      }
    },
    // onSearchText() {
    //   if (this.searchText.length) {
    //     const params = this.searchText.length ? { query: this.searchText } : undefined

    //     if (this.$route.name !== 'foodSearch') {
    //       router.push({ name: 'foodSearch', params })
    //     } else {
    //       router.replace({ name: 'foodSearch', params })
    //     }
    //   }
    // },
    onRouteChange() {
      if (this.$route.name === 'search') {
        this.isOpen = true
        this.searchText = this.$route.params.query
        this.searchTextLast = this.searchText
      } else {
        this.isOpen = false
      }
    },
    onKeyUp(e) {
      if (e.key === 'Enter') this.submit()
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
    left 8px

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
      padding 16px 8px 16px 56px
      background white
      border none
      font-size 20px
      font-weight 400
      outline none
</style>