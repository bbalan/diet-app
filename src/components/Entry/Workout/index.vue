<template>
  <div class="workout-entry">

    <md-card>

      <md-card-header v-if="isNew" class="md-title entry-name workout-name">
        New Workout
      </md-card-header>

      <md-card-content tag="form" @submit.prevent="onSubmit">
        <!--<div  v-if="!isNew && !isEditingName" :class="`${headingClass} entry-name`">
          {{ name }}
        </div>-->

        <div class="inputs">
          <md-input-container class="inputs__name">
            <label v-if="!isNew">Edit name</label>
            <label v-else>Name</label>
            <md-input v-model.number="name" ref="workoutName" @keyup.native="onKeyUp"></md-input>
          </md-input-container>

          <md-input-container class="inputs__calories">
            <label>Calories burned</label>
            <md-input type="number" v-model.number="calories" @keyup.native="onKeyUp"></md-input>
            <span class="calories__unit">kcal</span>
          </md-input-container>

          <md-button v-if="!uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
            Track
          </md-button>
          <md-button type="submit" v-if="uuid" class="md-raised md-primary inputs__eat inputs__submit" @click.native="onSubmit">
            Save
          </md-button>
        </div>
      </md-card-content>
    </md-card>
    
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
  computed: {
    isEditingName() {
      return store.state.appStatus.workout.isEditingName
    },
    headingClass() {
      if (!this.uuid) return 'md-display-1'

      const len = this.name.length

      if (len <= 20) {
        return 'md-display-1'
      } else if (len > 20 && len <= 50) {
        return 'md-title'
      }
      return 'md-subheading'
    },
  },
  watch: {
    isEditingName() {
      this.$refs.workoutName.$el.focus()
    },
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
    onKeyUp(e) {
      if (e.code === 'Enter') this.onSubmit()
    },
  },
}
</script>

<style scoped lang="stylus">
.workout-name
  margin-top 0

.workout-entry
  margin-bottom 16px
  
  .md-input-container
    margin-top -8px !important

    &.inputs__calories
      margin-bottom 0 !important
</style>