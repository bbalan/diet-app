<template>
  <div class="entry-list">
    <md-card class="entry-list__contents">
      <md-list>
        <entry-link 
          v-for="uuid in entriesReversed" 
          :uuid="uuid">
        </entry-link>
      </md-list>
    </md-card>
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
.entry-list

  &__contents
    overflow-x hidden
    overflow-y hidden
</style>