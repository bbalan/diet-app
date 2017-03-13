<template>

  <div class="entry--recipe page page--menu page--bg-grey">
    <md-whiteframe md-elevation="2" class="entry--recipe__inputs-wrapper page--padded">
      <div class="max-width entry--recipe__inputs">
        <md-input-container class="entry--recipe__inputs__name">
          <label>Recipe name</label>
          <md-input name="name" v-model="name"></md-input>
        </md-input-container>

        <div>
          {{ fatPct | roundTo }}_{{ carbsPct | roundTo }}_{{ proteinPct | roundTo }}
        </div>
      </div>
    </md-whiteframe>

    <div class="entry--recipe__ingredients">

      <md-list v-if="ingredients.length" class="md-double-line entry--recipe__ingredients__list">
        <entry-link v-for="uuid in ingredients" :uuid="uuid"></entry-link>
      </md-list>

      <div v-else class="entry--recipe__empty empty">
        <p>Ingredients for this recipe will appear here.</p>
        <p>Tap the <md-icon>add</md-icon> button to add an ingredient.</p>
      </div>
    </div>

    <md-button class="md-fab md-fab-bottom-right" @click.native="addIngredient">
      <md-icon>add</md-icon>
    </md-button>
  </div>

</template>

<script>
import store from 'store'
import { roundTo } from 'util/filters'
import EntryLink from 'components/Log/Day/EntryList/EntryLink'

export default {
  name: 'EditRecipe',
  props: ['uuid'],
  components: { EntryLink },
  filters: { roundTo },
  created() {
    store.commit('recipe/deleteAllDisabled')
    store.commit('recipe/add', this.uuid)
    store.commit('recipe/calculateNutrients', this.uuid)
    this.name = this.recipeData ? this.recipeData.name : null
  },
  computed: {
    name: {
      get() { return this.recipeData ? this.recipeData.name : null },
      set(name) {
        store.commit('recipe/setName', {
          uuid: this.uuid,
          name,
        })
      },
    },

    // Get recipe data from store
    recipeData() { return store.state.recipe.data[this.uuid] },

    // Recipe has been edited by the user
    isEnabled() { return this.recipeData ? this.recipeData.enabled : null },

    // Filter out invalid ingredients
    ingredients() {
      let ingredients = []
      if (this.recipeData) { ingredients = this.recipeData.ingredients }

      return ingredients ? ingredients.filter(ingredient => store.state.entries[ingredient]) : null
    },

    entries() { return this.ingredients.map(uuid => store.state.entries[uuid]) },
    masses() { return this.entries.map(entry => entry.data.mass) },

    nutrients() { return this.recipeData.nutrients },
    fat() { return this.nutrients.fat },
    carbs() { return this.nutrients.carbs },
    protein() { return this.nutrients.protein },
    sumMacros() { return this.fat + this.carbs + this.protein },
    fatPct() { return this.sumMacros !== 0 ? (this.fat / this.sumMacros) * 100 : 0 },
    carbsPct() { return this.sumMacros !== 0 ? (this.carbs / this.sumMacros) * 100 : 0 },
    proteinPct() { return this.sumMacros !== 0 ? (this.protein / this.sumMacros) * 100 : 0 },
  },
  methods: {
    addIngredient() {
      store.commit('recipe/setCurrentRecipe', this.uuid)
      this.$emit('evtOpenSearch')
    },
  },
  watch: {
    masses() {
      store.commit('recipe/calculateNutrients', this.uuid)
    },
  },
}
</script>

<style lang="stylus">
.entry--recipe
  display block

  form
    display flex
    width 100%

  input
    font-size 16px

  &__inputs-wrapper
    top 0
    left 0
    background white

  &__inputs
    position fixed
    display flex
    flex-direction row

    &__name
      margin 0 0 8px 0 !important

    &__save
      margin-right 0 !important
      margin-left 16px !important
      height 36px
      position relative
      top 8px

  &__ingredients
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    border-top 88px solid transparent

  &__empty
    position absolute
    top 50%
    left 50%
    margin -60px 0 0 -175px
    padding 16px 32px
    text-align center
    width 100%
    max-width 350px
</style>