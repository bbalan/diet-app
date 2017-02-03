<template>
  <ul>
    <entry 
      v-for="entry in entryList" 
      :foodUUID="entry.foodUUID"
      :mass="entry.mass">
    </entry>
  </ul>
</template>

<script>
import store from '../../store'
import Entry from './Entry'

export default {
  components: { Entry },
  computed: {
    entryList: {
      get() {
        return store.state.log.entries
      },
    },
  },
}
</script>