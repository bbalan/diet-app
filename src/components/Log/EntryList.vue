<template>
  <div>
    <h2>{{ dateFormatted }}</h2>
    <ul>
      <entry-link v-for="entryUUID in entries" :entryUUID="entryUUID">
      </entry-link>
    </ul>
  </div>
</template>

<script>
import EntryLink from './EntryLink'

export default {
  name: 'EntryList',
  props: ['entries', 'date'],
  components: { EntryLink },
  computed: {
    dateFormatted() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      const parsed = new Date(Date.parse(this.date))
      const formatted = `${months[parsed.getMonth() - 1]} ${parsed.getDay() - 1}, ${parsed.getFullYear()}`

      return formatted
    },
  },
}
</script>