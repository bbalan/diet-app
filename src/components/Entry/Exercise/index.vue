<template>
  <div>
    <h1>Exercise</h1>
    {{ today }}
  </div>
</template>

<script>
import store from 'store'

export default {
  name: 'Exercise',
  computed: {
    today() {
      return store.state.days.today
    },
  },
}
</script>
