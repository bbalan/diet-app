<template>
  <div class="set-data--food page page--menu">

    <view-food
      v-if="foodData"
      :name="foodData.dataFood.name"
      :serving="entry.data.mass"
      :food="foodData"
      submitText="Save"
      @submit="onSubmitFood">
    </view-food>

  </div>
</template>

<script>
/**
 * SetData pulls data from an entry and forwards it to the
 * appropriate dumb view component (ViewFood, ViewWorkout, etc).
 *
 * The view will emit a submit event to trigger a Vuex store
 * commit.
 */

import store from 'store'
import router from 'router'
import ViewFood from 'components/Views/Food'

export default {
  name: 'SetDataFood',
  components: { ViewFood },
  props: ['uuid'],
  computed: {
    entry() { return store.state.entries[this.uuid] },
    entryType() { return this.entry ? this.entry.type : null },
    itemUUID() { return this.entry ? this.entry.item : null },

    isFood() { return this.itemUUID && this.entryType === 'food' },
    foodData() { return this.isFood ? store.state.foodCache[this.itemUUID] : null },

    isCustom() { return this.itemUUID && this.entryType === 'custom' },
    customData() { return this.isCustom ? store.state.workout[this.itemUUID] : null },

    isRecipe() { return this.itemUUID && this.entryType === 'recipe' },
    recipeData() { return this.isRecipe ? store.state.recipes.data[this.itemUUID] : null },

    isWorkout() { return this.itemUUID && this.entryType === 'workout' },
    workoutData() { return this.isWorkout ? store.state.workout[this.itemUUID] : null },
  },
  methods: {
    onSubmitFood(mass) {
      // Save changes to this entry
      store.commit('entries/edit', {
        uuid: this.uuid,
        data: { mass },
      })
      store.commit('foodCache/setLastLoggedMass', {
        uuid: this.itemUUID,
        lastLoggedMass: mass,
      })
      router.go(-1)
    },
  },
}
</script>