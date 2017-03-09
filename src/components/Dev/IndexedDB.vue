<template>
  <div>
    <h2>IndexedDB</h2>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="name" placeholder="Name">
      <input type="number" v-model="age" placeholder="Age">
      <button type="submit">Submit</button>
    </form>

    <pre>{{ state }}</pre>

  </div>
</template>

<script>
import store from 'store'

export default {
  name: 'IndexedDB',
  data: () => ({
    name: null,
    age: null,
  }),
  computed: {
    state: () => store.state.indexeddb,
  },
  methods: {
    onSubmit() {
      store.dispatch('indexeddb/addFriend', {
        name: this.name,
        age: this.age,
      })
    },
  },
}
</script>