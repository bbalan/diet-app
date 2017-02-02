<template>
  <div class="searchResult">

    <!--<pre>{{ resultData }}</pre>-->

    <router-link 
      :to="'/food/' + resultData.source + '/' + id">
      {{ resultData.name }}
    </router-link>

  </div>
</template>

<script>
import { USDA, OTHER } from '../../api'

export default {
  props: ['resultData'],
  computed: {
    id() {
      switch (this.resultData.source) {
        case USDA:
          return this.resultData.ndbno
        case OTHER:
          return this.resultData.someID
        default:
          return false
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.searchResult
  cursor pointer

  &:hover
    background #eee

  &:active
    background #efe
</style>
