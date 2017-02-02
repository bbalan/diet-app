<template>
  <router-link :to="`/food/${source}/${id}`">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'FoodLink',
  props: ['id', 'source'],
}
</script>

<style scoped lang="stylus">
a
  display block
</style>
