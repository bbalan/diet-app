<template>
  <div class="entryFood page page--menu">

    <md-tabs md-fixed @change="nav" class="md-transparent" ref="tabs">
      <md-tab md-label="Favorites">
        <router-link :to="{ name: 'foodFavorites'}"></router-link>
      </md-tab>
      <!--<md-tab md-label="Search"></md-tab>-->
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
  name: 'FoodFind',
  data() {
    return {
      currentTab: 0,
      foodPathNames: [
        'foodFavorites',
        // 'foodSearch',
        'foodCustom',
        'foodRecipes',
      ],
    }
  },
  mounted() {
    setTimeout(this.updateTabs, 100)
  },
  watch: {
    $route() {
      setTimeout(this.updateTabs, 100)
    },
  },
  methods: {
    nav(tabIdx) {
      if (tabIdx !== this.currentTab) {
        this.currentTab = tabIdx
        router.push({ name: this.foodPathNames[tabIdx] })
      }
    },
    // Click the tab that matches the tab child path
    updateTabs() {
      const name = this.$route.name
      const tabIdx = this.foodPathNames.indexOf(name)

      if (tabIdx === this.currentTab) return

      const tabsList = this.$refs.tabs

      if (tabsList) {
        const el = tabsList.$el
        const wrapper = el.querySelector('nav')
        const tabs = wrapper.querySelectorAll('button')
        const params = this.$route.params
        if (tabs && tabs[tabIdx]) tabs[tabIdx].click()
        this.currentTab = tabIdx

        if (name === 'search') {
          router.replace({
            name: 'search',
            params: { query: params ? params.query : undefined },
          })
        }
      }
    },
  },
}
</script>

<style lang="stylus">
.entryFood
  .md-tabs-content
    display none
</style>