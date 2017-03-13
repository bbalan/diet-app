<template>
  <div class="iddb-item max-width">

    <h2>indexeddb (friends)</h2>

    <md-button @click.native="toggleVisible" class="md-icon-button iddb-item__toggle">
      <md-icon v-if="!isVisible">keyboard_arrow_down</md-icon>
      <md-icon v-else>keyboard_arrow_up</md-icon>
    </md-button>

    <div v-if="isVisible">
      <form @submit.prevent="onAddFriend">
        <input type="text" v-model="name" placeholder="Name">
        <input type="number" v-model="age" placeholder="Age">
        <button type="submit">Submit</button>
      </form>

      <indexed-db-item iddbkey="indexeddb"></indexed-db-item>
    </div>
  </div>
</template>

<script>
import store from 'store'
import IndexedDbItem from 'components/Dev/IndexedDbItem'

export default {
  name: 'IDDBFriends',
  components: { IndexedDbItem },
  data: () => ({
    name: null,
    age: null,
    isVisible: false,
  }),
  methods: {
    onDeleteFriend(id) {
      store.dispatch('indexeddb/deleteFriend', id)
    },
    onAddFriend() {
      store.dispatch('indexeddb/addFriend', {
        name: this.name,
        age: this.age,
      })
    },
    toggleVisible() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>

<style scoped lang="stylus">
ul
  padding 0
  margin 0

  li
    list-style-type none
</style>