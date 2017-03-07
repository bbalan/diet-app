<template>
  <transition name="toolbar-right-menu">
    <md-menu
      v-if="isEntry || isWorkout || isEntryCustom || isRecipe"
      md-size="3"
      md-direction="bottom left"
      class="side-menu">

      <md-button md-menu-trigger class="md-icon-button menu-button">
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item v-if="isEntryCustom" @click.native="onEntryCustomEdit">
          Edit custom food
        </md-menu-item>
        <md-menu-item v-if="isEntry" @click.native="onDeleteEntry">
          Delete entry
        </md-menu-item>
        <md-menu-item v-if="isWorkout" @click.native="onDeleteWorkout">
          Delete workout
        </md-menu-item>
        <md-menu-item v-if="isRecipe" @click.native="onDeleteRecipe">
          Delete recipe
        </md-menu-item>
      </md-menu-content>

  </md-menu>
  </transition>
</template>

<script>
import store from 'store'
import router from 'router'
// import { routerBackTo } from 'util'

export default {
  name: 'RightMenu',
  computed: {
    isEntry() { return this.$route.name === 'editEntry' },
    entryUUID() { return this.isEntry ? this.$route.params.uuid : null },
    entryData() { return this.isEntry ? store.state.entry[this.$route.params.uuid] : null },
    isEntryFood() { return this.entryData ? this.entryData.type === 'food' : false },
    isFoodFromCache() { return this.$route.name === 'addFood' },
    cacheUUID() { return this.isFoodFromCache ? this.$route.params.id : null },

    foodDataCached() {
      if (this.isEntryFood) {
        return store.state.foodCache[this.entryData.item]
      } else if (this.cacheUUID && store.state.foodCache[this.cacheUUID]) {
        return store.state.foodCache[this.cacheUUID]
      }

      return null
    },

    isEntryCustom() { return this.foodDataCached ? this.foodDataCached.source === 'custom' : false },
    customUUID() { return this.isEntryCustom ? this.foodDataCached.id : null },

    isEntryWorkout() { return this.entryData ? this.entryData.type === 'workout' : false },
    isWorkout() { return this.$route.name === 'editWorkout' },
    workoutUUID() { return this.isWorkout ? this.$route.params.uuid : null },

    isRecipe() { return this.$route.name === 'editRecipe' },
    recipeUUID() { return this.isRecipe ? this.$route.params.uuid : null },
  },
  methods: {
    onDeleteEntry() {
      // TODO: commit entries/disable instead of entries/delete
      store.commit('entry/delete', { uuid: this.entryUUID })
      router.go(-1)
    },
    onDeleteWorkout() {
      // TODO: commit workout/disable instead of workout/delete
      store.commit('workout/delete', { uuid: this.workoutUUID })
      router.go(-9000)
      router.push({ name: 'workout' })
    },
    onDeleteRecipe() {
      // TODO: commit workout/disable instead of workout/delete
      store.commit('recipe/disable', this.recipeUUID)
      router.go(-9000)
      router.push({ name: 'foodRecipes' })
    },
    onEntryCustomEdit() {
      router.push({ name: 'editCustom', params: { uuid: this.customUUID } })
    },
  },
}
</script>

<style scoped lang="stylus">
.side-menu
  position absolute
  top 8px
  right 8px

.toolbar-right-menu
  &-enter-active
  &-leave-active
    transition all .4s

  &-enter
  &-leave-to
    opacity 0
    transform scale(.5)
    transform-origin 70% center

.md-menu-content
  min-height 48px !important
  .md-list
    padding 0
</style>