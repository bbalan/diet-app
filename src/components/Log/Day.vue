<template>
  <div class="log__day">
    <h2>{{ dateFormatted }}</h2>
    <entry-list :entries="dataDay.entries"></entry-list>
  </div>
</template>

<script>
import EntryList from './EntryList'

export default {
  props: ['dataDay', 'date'],
  components: { EntryList },
  computed: {
    dateFormatted() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const parsed = new Date(Date.parse(this.date))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}, ${parsed.getFullYear()}`

      return formatted
    },
  },
}
</script>