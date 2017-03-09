<template>
  <div class="max-width page--padded">
    <h2>IndexedDB</h2>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="name" placeholder="Name">
      <input type="number" v-model="age" placeholder="Age">
      <button type="submit">Submit</button>
    </form>

    <ul>
      <li v-for="friend in friends">
        {{ friend.id }} - {{ friend.name }} | {{ friend.age}}
        <a href="#" @click="onDelete(friend.id)">
          Delete
        </a>
      </li>
    </ul>

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
    friends: () => store.state.indexeddb.friends,
  },
  methods: {
    onDelete(id) {
      store.dispatch('indexeddb/deleteFriend', { id })
    },
    onSubmit() {
      store.dispatch('indexeddb/addFriend', {
        name: this.name,
        age: this.age,
      })
    },
  },
}
</script>