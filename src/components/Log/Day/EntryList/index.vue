<template>
  <div>
    <ul>
      <entry-link 
        v-for="entryUUID in entries" 
        :entryUUID="entryUUID">
      </entry-link>
    </ul>
  </div>
</template>

<script>
import EntryLink from './EntryLink'

export default {
  name: 'EntryList',
  props: ['entries'],
  components: { EntryLink },
}
</script>

<style scoped lang="stylus">
ul
  padding 0
  list-style-type none
</style>