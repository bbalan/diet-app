<template>
  <li v-if="dataEntry" :class="{ entryLink: true, deleted: deleteTimeout }">

    <div class="entry__info" v-if="!deleteTimeout">
      <button @click="deleteEntry">X</button>

      <router-link
        :to="`entry/${entryUUID}`"
        class="edit">
        <span class="name" v-html="name"></span>
      </router-link>

      <span class="calories">{{calories | toKcal}}</span>

      <div class="foodInfo" v-if="isFood">
        <input name="mass" class="mass" v-model="mass" type="number">
        <label for="mass">g</label>
      </div>

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
import { toKcal } from 'util/filters'

export default {
  props: ['entryUUID'],
  filters: { toKcal },
  data() {
    return {
      deleteTimeout: null,
      deleteTime: 2000,
    }
  },
  computed: {
    dataEntry() {
      return store.state.entries.data[this.entryUUID]
    },
    isFood() {
      if (this.dataEntry) return this.dataEntry.type === 'food'
      return false
    },
    isExercise() {
      if (this.dataEntry) return this.dataEntry.type === 'exercise'
      return false
    },
    foodFromCache() {
      if (this.isFood) {
        return store.state.foodCache.food[this.dataEntry.item]
      }
      return null
    },
    dataExercise() {
      if (this.isExercise) {
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

      if (this.isExercise && this.dataExercise) {
        return truncate(this.dataEntry.data.name, 50)
      }

      return null
    },
    mass: {
      // TODO: handle exercise entries
      get() {
        return this.dataEntry.data.mass
      },
      set(mass) {
        store.commit('entries/edit', {
          entryUUID: this.entryUUID,
          data: { mass },
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

        return Math.floor(roundTo(energy.value * (this.mass / 100), 1))
      }

      if (this.isExercise) {
        if (!this.dataExercise) return null
        return this.dataExercise.calories
      }

      return null
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
  text-align :right
  font-size 16px
  width 70%

.foodInfo
.calories
  float right
  display inline-block
  width 150px
  text-align right
  font-weight bold
span
  margin 0 10px
</style>
