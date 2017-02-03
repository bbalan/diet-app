<template>
  <ul>
    <entry-link
      v-for="(entry, uuid) in entryList" 
      :foodUUID="entry.foodUUID"
      :entryUUID="uuid"
      :mass="entry.mass">
    </entry-link>
  </ul>
</template>

<script>
import store from '../../store'
import EntryLink from './EntryLink'

export default {
  name: 'EntryList',
  components: { EntryLink },
  computed: {
    entryList: {
      get() {
        return store.state.log.entries
      },
    },
  },
}
</script>