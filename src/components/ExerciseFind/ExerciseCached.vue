<template>
  <div>
    <form @submit.prevent v-if="exerciseData">
      <h2>Edit Exercise</h2>

      <p>
        <label for="exerciseName">Name:</label>
        <input name="exerciseName" type="text" v-model="name">
      </p>

      <p>
        <label for="exerciseCalories">Calories burned:</label>
        <input name="exerciseCalories" type="number" v-model.number="calories">
      </p>

      <button @click="onSubmit">Save</button>
      <button @click="onDelete">Delete</button>
    </form>

    <h2 v-else>Exercise not found</h2>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'

export default {
  name: 'ExerciseCached',
  props: ['exerciseUUID'],
  data() {
    return {
      name: null,
      calories: null,
      exerciseData: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const exerciseData = store.state.exerciseCache[this.exerciseUUID]
      this.exerciseData = exerciseData

      if (exerciseData) {
        this.name = exerciseData.name
        this.calories = exerciseData.calories
      } else {
        router.go(-1)
      }
    },
    onSubmit() {
      store.commit('exerciseCache/edit', {
        uuid: this.exerciseUUID,
        data: {
          name: this.name,
          calories: this.calories,
        },
      })
    },
    onDelete() {
      store.commit('exerciseCache/delete', { uuid: this.exerciseUUID })
      router.go(-1)
    },
  },
}
</script>
