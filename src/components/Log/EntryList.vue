<template>
  <div>
    <ul>
      <entry-link v-for="entryUUID in filteredEntries" :entryUUID="entryUUID"></entry-link>
    </ul>
  </div>
</template>

<script>
import store from '../../store'
import EntryLink from './EntryLink'

export default {
  name: 'EntryList',
  props: ['entries', 'date'],
  components: { EntryLink },
  computed: {
    // Filter only keys that match a value in store.state.log.entries
    filteredEntries() {
      return this.entries.filter(
        entryUUID => store.state.log.entries[entryUUID]
      )
    },
  },
}
</script>