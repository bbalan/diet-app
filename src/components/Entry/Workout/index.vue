<template>
  <div class="entry--workout">

    <md-card>

      <md-card-header v-if="isNew" class="md-title entry-name wordwrap--fade workout-name">
        New Workout
      </md-card-header>

      <md-card-content tag="form" @submit.prevent="onSubmit">
        <!--<div  v-if="!isNew && !isEditingName" :class="`${headingClass} entry-name wordwrap--fade`">
          {{ name }}
        </div>-->

        <div class="inputs">
          <md-input-container class="inputs__name">
            <label v-if="!isNew">Edit name</label>
            <label v-else>Name</label>
            <md-input v-model="name" ref="workoutName" @keydown.native="onKeyDown"></md-input>
          </md-input-container>

          <div class="inputs__submit-wrapper">
            <md-input-container class="inputs__calories">
              <label>Calories burned</label>
              <md-input type="number" v-model.number="calories" @keydown.native="onKeyDown"></md-input>
              <span class="calories__unit input__unit">kcal</span>
            </md-input-container>

            <md-button v-if="!uuid" class="md-raised md-primary inputs__submit" @click.native="onSubmit">
              Add
            </md-button>
            <md-button type="submit" v-if="uuid" class="md-raised md-primary inputs__submit" @click.native="onSubmit">
              Save
            </md-button>
          </div>
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
        const entry = store.state.entry[this.uuid]

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
        store.commit('workout/add', {
          uuid: workoutUUID,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })

        // Add an workout entry with the cached workout uuid
        store.commit('entry/add', {
          item: workoutUUID,
          type: 'workout',
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      } else {
        // This is an existing entry, edit it
        store.commit('entry/edit', {
          uuid: this.uuid,
          data: {
            name: this.name,
            calories: this.calories,
          },
        })
      }

      router.push({ name: 'log' })
    },
    onKeyDown(e) {
      // TODO: disable tab for desktop?
      if (e.code === 'Enter' || e.code === 'Tab') {
        this.onSubmit()
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.workout-name
  margin-top 0

.entry--workout
  margin-bottom 16px

  .md-input-container
    margin-top -8px !important

    &.inputs__calories
      margin-bottom 0 !important

  .inputs__submit
    position relative
    top 4px
    margin-left 16px
    margin-right 0

  .inputs__submit-wrapper
    display flex
</style>