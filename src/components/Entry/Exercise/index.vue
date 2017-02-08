<template>
  <div>
    <h2 v-if="isNew">New Exercise</h2>
    <h2 v-if="!isNew">Edit Workout Entry</h2>

    <form @submit.prevent="onSubmit">
      <p>
        <label for="exerciseName">Name:</label>
        <input name="exerciseName" type="text" v-model="name">
      </p>

      <p>
        <label for="exerciseCalories">Calories burned:</label>
        <input name="exerciseCalories" type="number" v-model.number="calories">
      </p>

      <button v-if="isNew" type="submit">Log exercise</button>
      <button v-if="!isNew" type="submit">Save</button>
    </form>
    
  </div>
</template>

<script>
import store from 'store'
import uuid from 'uuid'
import router from 'router'
import routes from 'router/routes'

export default {
  name: 'Exercise',
  props: ['entryUUID'],
  data() {
    return {
      name: null,
      calories: null,
      isNew: null,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      try {
        const entry = store.state.entries.data[this.entryUUID]

        if (!entry) {
          this.isNew = true
          return
        }

        const exercise = entry.data
        this.name = exercise.name
        this.calories = exercise.calories
      } catch (e) {
        return
      }
      return
    },
    onSubmit() {
      // This is a new entry
      if (!this.entryUUID) {
        const exerciseUUID = uuid.v4()

        // Add exercise to the exercise cache
        store.commit('exerciseCache/add', {
          uuid: exerciseUUID,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })

        // Add an exercise entry with the cached exercise uuid
        store.commit('entries/add', {
          item: exerciseUUID,
          type: 'exercise',
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      } else {
        // This is an existing entry, edit it
        store.commit('entries/edit', {
          entryUUID: this.entryUUID,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      }

      router.push(routes.Log)
    },
  },
}
</script>
