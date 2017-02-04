<template>
  <div>
    <h1>*DEV* Entry List</h1>
    <ul>
      <entry-link
        v-for="(entry, uuid) in entryList" 
        :foodUUID="entry.foodUUID"
        :entryUUID="uuid"
        :mass="entry.mass">
      </entry-link>
    </ul>
  </div>
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