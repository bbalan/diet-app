<template>
  <ul>
    <li v-for="entry in entryList">
      <pre>{{ entry }}</pre>
    </li>
  </ul>
</template>

<script>
import store from '../../store'

export default {
  computed: {
    entryList: {
      get() {
        return store.state.log.entries
      },
    },
  },
}
</script>