<template>
  <div>
    <h2>Entry {{ entryUUID }}</h2>
    <pre>{{ dataEntry }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  props: ['entryUUID'],
  computed: {
    dataEntry() {
      return store.state.entries.data[this.entryUUID]
    },
  },
}