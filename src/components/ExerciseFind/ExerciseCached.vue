<template>
  <div>
    <h2>Edit Exercise</h2>
    
    <form @submit.prevent="onSubmit">
      <p>
        <label for="exerciseName">Name:</label>
        <input name="exerciseName" type="text" v-model="name">
      </p>

      <p>
        <label for="exerciseCalories">Calories burned:</label>
        <input name="exerciseCalories" type="text" v-model.number="calories">
      </p>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import store from 'store'

export default {
  name: 'ExerciseCached',
  props: ['exerciseUUID'],
  data() {
    return {
      name: null,
      calories: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const exerciseData = store.state.exerciseCache[this.exerciseUUID]
      this.name = exerciseData.name
      this.calories = exerciseData.calories
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
  },
}
</script>
