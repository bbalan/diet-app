<template>
  <div class="iddb-item max-width">

    <h2>entries</h2>

    <md-button @click.native="toggleVisible" class="md-icon-button iddb-item__toggle">
      <md-icon v-if="!isVisible">keyboard_arrow_down</md-icon>
      <md-icon v-else>keyboard_arrow_up</md-icon>
    </md-button>

    <div v-if="isVisible">
      <form @submit.prevent="onAdd">
        <input type="number" v-model="item" placeholder="Item">
        <input type="text" v-model="type" placeholder="Type">
        <input type="text" v-model="data" placeholder="Data">

        <div>
        For recipe:

        <input
          type="radio"
          name="isForRecipe"
          id="isForRecipe-yes"
          value="yes"
          v-model="isForRecipe"
          class="md-primary isForRecipe-radio"
          required>yes</input>

        <input
          type="radio"
          name="isForRecipe"
          id="isForRecipe-no"
          value="no"
          v-model="isForRecipe"
          class="md-primary isForRecipe-radio"
          required>no</input>

        </div>

        <md-button class="md-raised md-primary" type="submit">Submit</button>
      </form>

      <indexed-db-item iddbkey="entries"></indexed-db-item>

      <md-button class="md-raised md-accent" @click.native="clear">
        <md-icon>warning</md-icon> Clear
      </button>
    </div>
  </div>
</template>

<script>
import store from 'store'
import IndexedDbItem from 'components/Dev/IndexedDbItem'

export default {
  name: 'IDDBEntries',
  components: { IndexedDbItem },
  data: () => ({
    item: null,
    type: null,
    data: null,
    isForRecipe: 'no',
    isVisible: true,
  }),
  methods: {
    onDelete(id) {
      store.dispatch('entries/delete', id)
    },
    onAdd() {
      store.dispatch('entries/add', {
        item: this.item,
        type: this.type,
        data: this.data,
        isForRecipe: this.isForRecipe === 'yes',
      })
    },
    clear() {
      store.dispatch('entries/clear')
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