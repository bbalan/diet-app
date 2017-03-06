<template>
  <div class="food-find page page--menu">

    <md-tabs md-fixed @change="nav" class="md-transparent food-find__tabs" ref="tabs">
      <md-tab md-label="Favorites"></md-tab>
      <md-tab md-label="Custom"></md-tab>
      <md-tab md-label="Recipes"></md-tab>
    </md-tabs>

    <transition name="page-fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import router from 'router'

export default {
  name: 'Food',
  data() {
    return {
      currentTab: 0,
      foodPathNames: ['foodFavorites', 'foodCustom', 'foodRecipes'],
    }
  },
  mounted() { setTimeout(this.updateTabs, 100) },
  watch: {
    $route() { setTimeout(this.updateTabs, 100) },
  },
  methods: {
    nav(tabIdx) {
      if (tabIdx !== this.currentTab) {
        this.currentTab = tabIdx
        router.replace({ name: this.foodPathNames[tabIdx] })
      }
    },
    // Click the tab that matches the tab child path
    updateTabs() {
      const name = this.$route.name
      const tabIdx = this.foodPathNames.indexOf(name)

      // already displaying correct tab
      if (tabIdx === this.currentTab) return

      const refTabs = this.$refs.tabs

      if (refTabs) {
        const el = refTabs.$el
        const wrapper = el.querySelector('nav')
        const tabs = wrapper.querySelectorAll('button')

        if (tabs && tabs[tabIdx]) tabs[tabIdx].click()
        this.currentTab = tabIdx
      }
    },
  },
}
</script>

<style lang="stylus">
.food-find
  &__tabs
    position fixed !important
    top 56px
    left 0
    z-index 4
  .md-tabs-content
    display none
</style>