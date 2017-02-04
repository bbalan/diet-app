<template>
  <div>
    <h1>*DEV* Entries</h1>
    <ul>
      <entry-link  v-for="(entry, entryUUID) in entries" :entryUUID="entryUUID"></entry-link>
    </ul>
  </div>
</template>

<script>
import store from 'store'
import EntryLink from '../Log/Day/EntryList/EntryLink'

export default {
  name: 'DevEntries',
  data: () => ({ entries: store.state.log.entries }),
  components: { EntryLink },
}
</script>

<style scoped lang="stylus">
ul
  padding 0
  list-style-type none
</style>