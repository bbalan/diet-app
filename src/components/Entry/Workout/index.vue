<template>
  <div class="workout-entry grid__outer">
    <form @submit.prevent="onSubmit">
      <div v-if="!isNew" class="md-display-1 entry-name">{{ name }}</div>

      <div class="inputs">
        <md-input-container v-if="isNew" class="inputs__name">
          <label>Workout name</label>
          <md-input v-model.number="name"></md-input>
        </md-input-container>

        <md-input-container class="inputs__calories">
          <label>Calories burned</label>
          <md-input type="number" v-model.number="calories"></md-input>
          <span class="calories__unit">kcal</span>
        </md-input-container>

        <md-button v-if="!uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
          Track
        </md-button>
        <md-button v-if="uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
          Save
        </md-button>
      </div>
    </form>
    
  </div>
</template>

<script>
// TODO: add workout notes field
import store from 'store'
import uuid from 'uuid'
import router from 'router'

export default {
  name: 'Workout',
  props: ['uuid'],
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
        const entry = store.state.entries[this.uuid]

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
      if (!this.uuid) {
        const workoutUUID = uuid.v4()

        // Add workout to the workout cache
        store.commit('workoutPresets/add', {
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
          uuid: this.uuid,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      }

      router.push({ name: 'log' })
    },
  },
}
</script>
