<template>
  <div class="searchResult" data-ndbno="ndbno">
    <span class="searchResult__add">+</span>
    <span class="searchResult__name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: ['name', 'ndbno'],
}
</script>

<style scoped>

</style>
