<template>
  <router-link :to="`/ingredient/${source}/${id}`">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'IngredientLink',
  props: ['id', 'source'],
}
</script>

<style scoped lang="stylus">
a
  display block
</style>
