<template>

  <div class="entry--recipe page page--menu page--bg-grey">
    <md-whiteframe md-elevation="2" class="entry--recipe__inputs page--padded">

      <form @submit.prevent="save">
        <md-input-container class="entry--recipe__inputs__name">
          <label>Recipe name</label>
          <md-input name="name" v-model="name"></md-input>
        </md-input-container>

        <md-button
          class="entry--recipe__inputs__save md-raised md-primary"
          type="submit">
          Save
        </md-button>
      </form>
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
import router from 'router'
import store from 'store'
import EntryLink from 'components/Log/Day/EntryList/EntryLink'

export default {
  name: 'EntryNewRecipe',
  props: ['uuid'],
  components: { EntryLink },
  data() {
    return {
      name: null,
    }
  },
  created() {
    store.commit('recipe/add', this.uuid)
    this.name = this.recipeData ? this.recipeData.name : null
  },
  computed: {
    recipeData() { return store.state.recipe.data[this.uuid] },
    ingredients() {
      let ingredients = []

      if (this.recipeData) {
        ingredients = this.recipeData.ingredients
      }

      return ingredients.filter(ingredient => store.state.entry[ingredient])
    },
  },
  methods: {
    addIngredient() {
      store.commit('recipe/setCurrentRecipe', this.uuid)
      this.$emit('evtOpenSearch')
    },
    save() {
      store.commit('recipe/setName', {
        uuid: this.uuid,
        name: this.name,
      })
      router.go(-1)
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

  &__inputs
    position fixed
    display flex
    flex-direction row
    top 0
    left 0
    background white

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