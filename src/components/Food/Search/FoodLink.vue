<template>
  <router-link class="foodLink" :to="{ name: 'foodFromCache', params: { source, id } }">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  props: ['name', 'id', 'source'],
}
</script>

<style scoped lang="stylus">

</style>
