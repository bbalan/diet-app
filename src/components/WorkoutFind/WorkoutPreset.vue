<template>
  <div class="workout--preset page--padded page page--main page--menu page--cards">
    
    <md-card v-if="workoutData">

      <md-card-content tag="form" @submit.prevent="onSubmit">

        <div class="inputs">
          <md-input-container class="inputs__name">
            <label>Name</label>
            <md-input v-model="name" ref="workoutName" @keyup.native="onKeyUp"></md-input>
          </md-input-container>

          <md-input-container class="inputs__calories">
            <label>Calories burned</label>
            <md-input type="number" v-model.number="calories" @keyup.native="onKeyUp"></md-input>
            <span class="calories__unit">kcal</span>
          </md-input-container>

          <md-button type="submit" v-if="uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
            Save
          </md-button>
        </div>
      </md-card-content>
    </md-card>

    <h2 v-else>Workout not found</h2>
  </div>
</template>

<script>
import 'components/WorkoutFind/styles.styl'
import store from 'store'
import router from 'router'

export default {
  name: 'WorkoutPreset',
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
    onKeyUp(e) {
      if (e.code === 'Enter') this.onSubmit()
    },
  },
}
</script>