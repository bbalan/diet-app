<template>
  <div>
    <ul>
      <entry-link 
        v-for="entryUUID in entriesReversed" 
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
  computed: {
    entriesReversed() {
      const reversed = []
      this.entries.forEach((entry) => {
        reversed.unshift(entry)
      })
      return reversed
    },
  },
}
</script>

<style scoped lang="stylus">
ul
  padding 0
  list-style-type none
</style>