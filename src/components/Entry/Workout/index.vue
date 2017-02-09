<template>
  <div>
    <h2 v-if="isNew">New Workout</h2>
    <h2 v-if="!isNew">Edit Workout Entry</h2>

    <form @submit.prevent="onSubmit">
      <p>
        <label for="workoutName">Name:</label>
        <input name="workoutName" type="text" v-model="name">
      </p>

      <p>
        <label for="workoutCalories">Calories burned:</label>
        <input name="workoutCalories" type="number" v-model.number="calories">
      </p>

      <button v-if="isNew" type="submit">Log workout</button>
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
  name: 'Workout',
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
        const entry = store.state.entries[this.entryUUID]

        if (!entry) {
          this.isNew = true
          return
        }

        const workout = entry.data
        this.name = workout.name
        this.calories = workout.calories
      } catch (e) {
        return
      }
      return
    },
    onSubmit() {
      // This is a new entry
      if (!this.entryUUID) {
        const workoutUUID = uuid.v4()

        // Add workout to the workout cache
        store.commit('workoutCache/add', {
          uuid: workoutUUID,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })

        // Add an workout entry with the cached workout uuid
        store.commit('entries/add', {
          item: workoutUUID,
          type: 'workout',
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      } else {
        // This is an existing entry, edit it
        store.commit('entries/edit', {
          uuid: this.entryUUID,
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
