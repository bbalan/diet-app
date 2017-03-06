<template>
  <div class="set-data--food page page--menu page--padded">

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

    <view-recipe v-if="recipeData">
      <pre>{{ recipeData }}</pre>
    </view-recipe>

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
import ViewFood from 'components/Forms/Food'
import ViewRecipe from 'components/Forms/Recipe'
import ViewWorkout from 'components/Forms/Workout'

export default {
  name: 'EntryEdit',
  components: { ViewFood, ViewRecipe, ViewWorkout },
  props: ['uuid'],
  computed: {
    entry() { return store.state.entry[this.uuid] },
    entryType() { return this.entry ? this.entry.type : null },
    itemUUID() { return this.entry ? this.entry.item : null },

    isFood() { return this.itemUUID && this.entryType ? this.entryType === 'food' : false },
    foodData() { return this.isFood ? store.state.foodCache[this.itemUUID] : null },

    isCustom() { return this.itemUUID && this.entryType ? this.entryType === 'custom' : false },
    customData() { return this.isCustom ? store.state.workout[this.itemUUID] : null },

    isRecipe() { return this.itemUUID && this.entryType ? this.entryType === 'recipe' : false },
    recipeData() { return this.isRecipe ? store.state.recipes.data[this.itemUUID] : null },

    isWorkout() { return this.entryType ? this.entryType === 'workout' : false },
    workoutData() { return this.isWorkout && this.entry && this.entry ? this.entry.data : null },
  },
  methods: {
    onSubmitFood(mass) {
      // Save changes to this entry
      store.commit('entry/edit', {
        uuid: this.uuid,
        data: { mass },
      })
      store.commit('foodCache/setLastLoggedMass', {
        uuid: this.itemUUID,
        lastLoggedMass: mass,
      })
      router.go(-1)
    },

    onSubmitWorkout(data) {
      store.commit('entry/edit', { uuid: this.uuid, data })
      router.go(-1)
    },

    onSubmitRecipe(data) {
      console.log(data)
    },
  },
}
</script>