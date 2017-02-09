<template>
  <li v-if="dataEntry" :class="{ entryLink: true, deleted: deleteTimeout }">

    <div class="entry__info" v-if="!deleteTimeout">
      <button @click="deleteEntry">X</button>

      <router-link
        :to="`entry/${uuid}`"
        class="edit">
        <span class="name" v-html="name"></span>
      </router-link>

      <div class="mass" v-if="isFood">
        <input name="mass" v-model="mass" type="number">
        <label for="mass">g</label>
      </div>

      <span class="calories">{{calories | roundTo | roundTo | toKcal}}</span>

    </div>

    <div class="entry__undo-delete" v-if="deleteTimeout">
      Deleted
      <button @click="undoDelete">Undo</button>
    </div>

  </li>
</template>

<script>
import { truncate } from 'util'
import store from 'store'
import { USDA, OTHER } from 'api'
import { toKcal, roundTo } from 'util/filters'

export default {
  props: ['uuid'],
  filters: { toKcal, roundTo },
  data() {
    return {
      deleteTimeout: null,
      deleteTime: 2000,
    }
  },
  computed: {
    dataEntry() {
      return store.state.entries[this.uuid]
    },
    isFood() {
      if (this.dataEntry) return this.dataEntry.type === 'food'
      return false
    },
    isWorkout() {
      if (this.dataEntry) return this.dataEntry.type === 'workout'
      return false
    },
    foodFromCache() {
      if (this.isFood) {
        return store.state.foodCache.food[this.dataEntry.item]
      }
      return null
    },
    dataWorkout() {
      if (this.isWorkout) {
        return this.dataEntry.data
      }
      return null
    },
    dataFood() {
      if (this.foodFromCache) {
        return this.foodFromCache.dataFood
      }
      return null
    },
    name() {
      if (this.isFood && this.dataFood) {
        return truncate(this.dataFood.name, 50)
      }

      if (this.isWorkout && this.dataWorkout) {
        return truncate(this.dataEntry.data.name, 50)
      }

      return null
    },
    mass: {
      // TODO: handle workout entries
      get() {
        if (this.isFood && this.dataEntry) {
          return this.dataEntry.data.mass
        }
        return null
      },
      set(mass) {
        store.commit('entries/setMass', {
          uuid: this.uuid,
          mass,
        })
      },
    },
    calories() {
      if (this.isFood) {
        if (!this.foodFromCache) return 0

        let energy = 0

        switch (this.foodFromCache.source) {
          case USDA:
            energy = this.dataFood.nutrients.find(
              nutrient => nutrient.nutrient_id === '208'
            )
            break
          case OTHER:
          default:
            // Not implemented
            break
        }

        return energy.value * (this.mass / 100)
      }

      if (this.isWorkout) {
        if (!this.dataWorkout) return null
        return this.dataWorkout.calories
      }

      return null
    },
  },
  methods: {
    // Remove this entry forever
    // TODO: make this do something
    deleteEntry() {
      store.commit('entries/disable', { uuid: this.uuid })

      this.deleteTimeout = setTimeout(() => {
        store.commit('entries/delete', { uuid: this.uuid })
        this.deleteTimeout = null
      }, this.deleteTime)
    },
    undoDelete() {
      store.commit('entries/enable', { uuid: this.uuid })
      clearTimeout(this.deleteTimeout)
      this.deleteTimeout = null
    },
  },
}
</script>

<style scoped lang="stylus">
.entryLink
  width 100%
  height 25px
  position relative

  .foodInfo
    display inline

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
  width 10%
  position absolute
  right 10%
  top 0

  input
    font-size 16px
    text-align right
    width 70%
    display inline-block

  label
    width 30%

.calories
  display inline-block
  width 10%
  text-align right
  font-weight bold
  position absolute
  right 0
  top 0
span
  margin 0 10px
</style>
