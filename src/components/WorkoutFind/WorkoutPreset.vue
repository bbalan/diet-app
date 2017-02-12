<template>
  <div>
    <form @submit.prevent v-if="workoutData">
      <p>
        <label for="workoutName">Name:</label>
        <input name="workoutName" type="text" v-model="name">
      </p>

      <p>
        <label for="workoutCalories">Calories burned:</label>
        <input name="workoutCalories" type="number" v-model.number="calories">
      </p>

      <button @click="onSubmit">Save</button>
      <button @click="onDelete">Delete</button>
    </form>

    <h2 v-else>Workout not found</h2>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'

export default {
  name: 'WorkoutCached',
  props: ['uuid'],
  data() {
    return {
      name: null,
      calories: null,
      workoutData: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const workoutData = store.state.workoutPresets[this.uuid]
      this.workoutData = workoutData

      if (workoutData) {
        this.name = workoutData.name
        this.calories = workoutData.calories
      } else {
        // router.go(-1)
      }
    },
    onSubmit() {
      store.commit('workoutPresets/edit', {
        uuid: this.uuid,
        data: {
          name: this.name,
          calories: this.calories,
        },
      })
      router.go(-1)
    },
    onDelete() {
      store.commit('workoutPresets/delete', { uuid: this.uuid })
      router.go(-1)
    },
  },
}
</script>
