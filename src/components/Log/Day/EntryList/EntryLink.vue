<template>
  <li v-if="dataEntry" :class="{ entryLink: true, deleted: deleteTimeout }">

    <div class="entry__info" v-if="!deleteTimeout">
      <button @click="deleteEntry">X</button>

      <router-link :to="`entry/${entryUUID}`" class="edit">
        <span class="name" v-html="name"></span>
      </router-link>

      <input name="mass" class="mass" v-model="mass" type="number">
      <label for="mass">g</label>
      <span class="calories">{{calories}}</span>
    </div>

    <div class="entry__undo-delete" v-if="deleteTimeout">
      Deleted
      <button @click="undoDelete">Undo</button>
    </div>

  </li>
</template>

<script>
import { truncate, roundTo } from 'util'
import store from 'store'
import { USDA, OTHER } from 'api'

export default {
  props: ['entryUUID'],
  data() {
    return {
      deleteTimeout: null,
      deleteTime: 2000,
    }
  },
  computed: {
    name() {
      return truncate(this.dataFood.name, 50)
    },
    dataEntry() {
      return store.state.entries.data[this.entryUUID]
    },
    foodFromCache() {
      // TODO: handle exercise entries
      return store.state.foodCache.food[this.dataEntry.item]
    },
    dataFood() {
      // TODO: handle exercise entries
      return this.foodFromCache.dataFood
    },
    mass: {
      // TODO: handle exercise entries
      get() {
        return this.dataEntry.mass
      },
      set(val) {
        store.commit('entries/edit', {
          entryUUID: this.entryUUID,
          mass: val,
        })
      },
    },
    calories() {
      // TODO: handle exercise entries
      let energy = 0

      switch (this.foodFromCache.source) {
        case USDA:
          energy = this.dataFood.nutrients.find(
            nutrient => nutrient.nutrient_id === '208'
          )
          break
        case OTHER:
        default:
          console.error('API not implemented')
          break
      }

      const energyVal = Math.floor(roundTo(energy.value * (this.mass / 100), 1))
      return `${energyVal} ${energy.unit}`
    },
  },
  methods: {
    // Remove this entry forever
    deleteEntry() {
      store.commit('entries/disable', { entryUUID: this.entryUUID })

      this.deleteTimeout = setTimeout(() => {
        store.commit('entries/delete', { entryUUID: this.entryUUID })
        this.deleteTimeout = null
      }, this.deleteTime)
    },
    undoDelete() {
      store.commit('entries/enable', { entryUUID: this.entryUUID })
      clearTimeout(this.deleteTimeout)
      this.deleteTimeout = null
    },
  },
}
</script>

<style scoped lang="stylus">
.entryLink
  position relative

  &.deleted
    .entry__info
      display none
  
.edit
  width 50px
  color #42b983
.name
  display inline-block
  width 60%
.mass
.calories
  display inline-block
  width 100px
  text-align right
.calories
  font-weight bold
span
  margin 0 10px
</style>
