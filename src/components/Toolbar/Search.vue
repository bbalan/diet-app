<template>
  <transition name="toolbar__search">
    <md-button 
      v-if="searchEnabled"
      class="md-icon-button toolbar__search"
      @click.native="openSearch">
      <md-icon>search</md-icon>
    </md-button>
  </transition>
</template>

<script>
export default {
  name: 'Search',
  computed: {
    searchEnabled() { return this.$route.meta.search },
  },
  methods: {
    openSearch() {
      this.searchOpen = true
    },
  },
}
</script>

<style scoped lang="stylus">
.toolbar__search
  position absolute !important
  right 8px !important
  left auto !important
</style>