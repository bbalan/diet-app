<template>
  <div class="searchResultList">
      <search-result 
        v-for="item in list" 
        :name="item.name" 
        :ndbno="item.ndbno"
        @click.native="selectItem(item.ndbno)">
      </search-result>
  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  props: [
    'list',
  ],
  components: {
    SearchResult,
  },
  methods: {
    selectItem(ndbno) {
      this.$emit('eventSelectItem', ndbno)
    },
  },
}
</script>

<style scoped>

</style>
