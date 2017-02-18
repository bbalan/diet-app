<template>
  <div class="entry-list page--padded">
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
  box-sizing border-box
  position absolute
  bottom 0
  left 0
  width 100%
  height 100%
  border-top 148px solid transparent

  &__contents
    overflow-x hidden
    overflow-y hidden
</style>