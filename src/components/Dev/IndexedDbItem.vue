<template>
  <div>
    <pre>{{ itemData }}</pre>
  </div>
</template>

<script>
import store from 'store'

export default {
  name: 'IndexedDBItem',
  props: ['iddbkey'],
  computed: {
    itemData() {
      return store.state[this.iddbkey]
    },
  },
}
</script>