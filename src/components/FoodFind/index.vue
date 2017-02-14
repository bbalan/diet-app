<template>
  <div class="entryFood">

    <md-tabs md-fixed class="md-transparent">
      <md-tab @click="nav(0)" md-label="Search"></md-tab>
      <md-tab @click="nav(1)" md-label="Favorites"></md-tab>
      <md-tab @click="nav(2)" md-label="Custom"></md-tab>
      <md-tab @click="nav(3)" md-label="Recipes"></md-tab>
    </md-tabs>

    <router-view></router-view>
  </div>
</template>

<script>
import router from 'router'

export default {
  name: 'FoodFind',
  data() {
    return {
      foodPathNames: [
        'foodSearch',
        'foodFavorites',
        'foodCustom',
        'foodRecipes',
      ],
    }
  },
  methods: {
    nav(tabIdx) {
      console.log('md-tabs change', tabIdx)
      router.push({ name: this.foodPathNames[tabIdx] })
    },
  },
}
</script>

<style lang="stylus">
.entryFood
  .md-tabs-content
    display none
</style>