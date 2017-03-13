<template>
  <div class="entry-list">
    <md-whiteframe md-elevation="2" class="entry-list__contents">
      <md-list class="md-double-line">
        <entry-link
          v-for="id in entriesReversed"
          :id="id">
        </entry-link>
      </md-list>
    </md-whiteframe>
  </div>
</template>

<script>
import EntryLink from 'components/Log/Day/EntryList/EntryLink'

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