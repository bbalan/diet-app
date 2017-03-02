<template>
  <div class="page--recipes page page--padded page--tabs page--bg-grey">
    <md-list v-if="recipeList && recipeList.length">

    </md-list>

    <div v-else class="page--recipes__empty">
      <p>Recipes that you create will appear here.</p>
      <p>Tap the <md-icon>add</md-icon> button to create a recipe.</p>
    </div>

    <md-button class="md-fab md-fab-bottom-right" @click.native="add">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import router from 'router'
import UUID from 'uuid'

// TODO: when saving an edited recipe, create a clone and set 'deprecated: true' on original
export default {
  name: 'Recipes',
  computed: {
    recipeList() {
      return []
    },
  },
  methods: {
    add() {
      router.push({ name: 'entryRecipe', params: { uuid: UUID.v4() } })
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

</style>