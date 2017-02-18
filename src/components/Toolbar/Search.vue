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
            v-model="searchText">
        </form>

        <!-- TODO: previous searches -->
          
        <transition name="fade">
          <md-button 
            v-if="searchText.length"
            class="md-icon-button toolbar__search__clear"
            @click.native="clear">
            <md-icon>close</md-icon>
          </md-button>
        </transition>

        <md-button 
          class="md-icon-button toolbar__search__back"
          @click.native="close">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </transition>
  </div>
</template>

<script>
import router from 'router'

export default {
  name: 'Search',
  data() {
    return {
      isOpen: false,
      searchText: '',
      inputEl: null,
    }
  },
  computed: {
    searchEnabled() { return this.$route.meta.search },
  },
  watch: {
    isOpen(open) {
      if (open) {
        this.focus()
      } else {
        this.searchText = ''
      }
    },
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
      console.log(this.$route.name)
      if (this.$route.name === 'foodSearch') router.go(-1)
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
      router.push({ name: 'foodSearch', params: { query: this.searchText } })
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