<template>
  <div class="page--recipes page page--tabs page--bg-grey">

    <md-list v-if="recipeList && recipeList.length" class="recipe-list">
      <md-list-item v-for="recipe in recipeList" v-if="recipe.enabled">

        <router-link :to="{ name: 'addFood', params: { source: 'recipe', id: recipe.uuid } }" class="recipe-link">
          <div class="md-list-text-container">
            <span class="recipe-link__name wordwrap--fade">{{ recipe.name || 'Unnamed recipe' | capitalize }}</span>
          </div>
        </router-link>

        <md-button class="md-icon-button md-list-action recipe-edit" @click.native="edit(recipe.uuid)">
          <md-icon>create</md-icon>
        </md-button>


        <md-divider></md-divider>

      </md-list-item>
    </md-list>

    <div v-else class="page--recipes__empty">
      <p>Recipes that you create will appear here.</p>
      <p>Tap the <md-icon>add</md-icon> button to create a recipe.</p>
    </div>

    <!--<pre>{{ recipeList }}</pre>-->

    <md-button class="md-fab md-fab-bottom-right" @click.native="add">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import { capitalize } from 'util/filters'
import store from 'store'
import router from 'router'
import UUID from 'uuid'

// TODO: when saving an edited recipe, create a clone and set 'deprecated: true' on original
export default {
  name: 'Recipes',
  filters: { capitalize },
  computed: {
    recipeData: () => store.state.recipe.data,
    recipeList() {
      if (!this.recipeData) return []
      return Object.entries(store.state.recipe.data)
        .map(recipe => ({ uuid: recipe[0], ...recipe[1] }))
        .filter(recipe => recipe.enabled)
    },
  },
  methods: {
    add() {
      router.push({ name: 'editRecipe', params: { uuid: UUID.v4() } })
    },
    edit(uuid) {
      router.push({ name: 'editRecipe', params: { uuid } })
    },
  },
}
</script>

<style lang="stylus">
.page--recipes
  &__empty
    position absolute
    top 50%
    left 50%
    margin -60px 0 0 -175px
    padding 16px 32px
    text-align center
    width 100%
    max-width 350px

  .recipe-edit
    position absolute !important
    right 0
    top 0 !important
    height 48px !important
    width 56px !important
    padding-right 24px !important
    margin 0 !important

</style>