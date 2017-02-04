<template>
  <div>
    <ul>
      <entry-link v-for="entryUUID in entries" :entryUUID="entryUUID"></entry-link>
    </ul>
  </div>
</template>

<script>
import EntryLink from './EntryLink'

export default {
  name: 'EntryList',
  props: ['entries', 'date'],
  components: { EntryLink },
}
</script>