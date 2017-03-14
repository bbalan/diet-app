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
        <md-menu-item v-if="isEntryRecipe" @click.native="onEditRecipe">
          Edit recipe
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

export default {
  name: 'RightMenu',
  computed: {
    isEntry() { return this.$route.name === 'editEntry' },
    entryID() { return this.isEntry ? this.$route.params.id : null },
    entryData() { return this.isEntry ? store.state.entries[this.$route.params.uuid] : null },
    isEntryFood() { return this.entriesData ? this.entriesData.type === 'food' : false },
    isEntryRecipe() { return this.entriesData ? this.entriesData.type === 'recipe' : false },
    isFoodFromCache() { return this.$route.name === 'addFood' },
    cacheUUID() { return this.isFoodFromCache ? this.$route.params.id : null },

    foodDataCached() {
      if (this.isEntryFood || this.isEntryRecipe) {
        return store.state.foodCache[this.entriesData.item]
      } else if (this.cacheUUID && store.state.foodCache[this.cacheUUID]) {
        return store.state.foodCache[this.cacheUUID]
      }

      return null
    },

    isEntryCustom() { return this.foodDataCached ? this.foodDataCached.source === 'custom' : false },
    customUUID() { return this.isEntryCustom ? this.foodDataCached.id : null },

    isEntryWorkout() { return this.entriesData ? this.entriesData.type === 'workout' : false },
    isWorkout() { return this.$route.name === 'editWorkout' },
    workoutID() { return this.isWorkout ? this.$route.params.id : null },

    isRecipe() { return this.$route.name === 'editRecipe' },
    recipeUUID() {
      if (this.isRecipe) return this.$route.params.uuid
      if (this.isEntryRecipe && this.foodDataCached) return this.foodDataCached.id
      return null
    },
  },
  methods: {
    onDeleteEntry() {
      // TODO: dispatch entries/disable instead of entries/delete
      store.dispatch('entries/delete', this.entryID)
      router.go(-1)
    },
    onDeleteWorkout() {
      // TODO: dispatch workouts/disable instead of workouts/delete
      store.dispatch('workouts/delete', this.workoutID)
      router.go(-9000)
      router.push({ name: 'workout' })
    },
    onDeleteRecipe() {
      // TODO: dispatch workouts/disable instead of workouts/delete
      store.commit('recipe/disable', this.recipeUUID)
      router.go(-9000)
      router.push({ name: 'foodRecipes' })
    },
    onEntryCustomEdit() {
      router.push({ name: 'editCustom', params: { uuid: this.customUUID } })
    },
    onEditRecipe() {
      router.push({ name: 'editRecipe', params: { uuid: this.recipeUUID } })
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