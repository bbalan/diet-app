<template>
  <router-link class="foodLink" :to="`/food/${source}/${id}`">{{ name }}</router-link>
</template>

<script>
export default { props: ['name', 'id', 'source'] }
</script>

<style scoped lang="stylus">
.foodLink
  display block
</style>
