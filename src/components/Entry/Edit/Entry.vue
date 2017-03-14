<template>
  <div class="entry--edit page page--menu page--padded">

    <view-food v-if="foodData"
      :name="foodData.dataFood.name"
      :serving="entry.data.mass"
      :food="foodData"
      submitText="Save"
      @submit="onSubmitFood">
    </view-food>

    <view-workout v-if="workoutData"
      :name="workoutData.name"
      :calories="workoutData.calories"
      submitText="Save"
      @submit="onSubmitWorkout">
    </view-workout>

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
import ViewFood from 'components/Entry/Common/Food'
import ViewWorkout from 'components/Entry/Common/Workout'

export default {
  name: 'EditEntry',
  components: { ViewFood, ViewWorkout },
  props: ['id'],
  computed: {
    entry() { return store.state.entries.data.find(e => e.id === this.id) },
    entryType() { return this.entry ? this.entry.type : null },
    itemID() { return this.entry ? this.entry.item : null },

    isFood() { return this.itemID && this.entryType ? this.entryType === 'food' : false },
    foodData() {
      return this.isFood || this.isRecipe ? store.state.foodCache[this.itemID] : null
    },

    isCustom() { return this.itemID && this.entryType ? this.entryType === 'custom' : false },
    customData() { return this.isCustom ? store.state.workout[this.itemID] : null },

    isRecipe() { return this.itemID && this.entryType ? this.entryType === 'recipe' : false },
    recipeData() { return this.foodData },

    isWorkout() { return this.entryType ? this.entryType === 'workout' : false },
    workoutData() {
      return this.isWorkout && this.entry && this.entry ? this.entry.data : null
    },
  },
  methods: {
    onSubmitFood(mass) {
      // Save changes to this entry
      store.dispatch('entries/edit', {
        id: this.id,
        data: { mass },
      })
      store.commit('foodCache/setLastLoggedMass', {
        id: this.itemID,
        lastLoggedMass: mass,
      })
      router.go(-1)
    },

    onSubmitWorkout(data) {
      store.dispatch('entries/edit', { id: this.id, data })
      router.go(-1)
    },

    onSubmitRecipe(data) {
      console.log(data)
    },
  },
}
</script>