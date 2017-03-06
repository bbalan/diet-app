<template>
  <div class="common--workout">

    <!-- TODO: validation -->

    <form @submit.prevent>

      <div class="inputs">
        <md-input-container class="inputs__name" ref="workoutName">
          <label>Workout name</label>
          <md-input
            v-model="newName"
            @keydown.native="onKeyDown"
            @focus.native="onFocusInput('workoutName')"></md-input>
        </md-input-container>

        <div class="inputs__submit-wrapper">
          <md-input-container class="inputs__calories" ref="workoutCalories">
            <label>Calories burned</label>
            <md-input
              type="number"
              v-model.number="newCalories"
              @keydown.native="onKeyDown"
              @focus.native="onFocusInput('workoutCalories')"></md-input>
            <span class="calories__unit input__unit">kcal</span>
          </md-input-container>

          <md-button class="md-raised md-primary inputs__submit" @click.native="onSubmit">
            {{ submitText }}
          </md-button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import { onFocusInput } from 'util'

// TODO: add workout notes field
export default {
  name: 'CommonWorkout',
  props: ['name', 'calories', 'submitText'],
  data: () => ({
    newName: null,
    newCalories: null,
  }),
  created() {
    this.newName = this.name || ''
    this.newCalories = this.calories || null
  },
  computed: {
    headingClass() {
      if (!this.name) return '' // this is a new entry

      const len = this.name.length

      if (len <= 20) {
        return 'md-display-1'
      } else if (len > 20 && len <= 50) {
        return 'md-title'
      }
      return 'md-subheading'
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', {
        name: this.newName || this.name,
        calories: this.newCalories,
      })
    },
    onKeyDown(e) {
      // TODO: disable tab for desktop?
      if (e.code === 'Enter' || e.which === 9) {
        this.onSubmit()
      }
    },
    onFocusInput,
  },
}
</script>

<style lang="stylus">
.common--workout
  .inputs
    &__submit
      position relative
      top 8px
      margin-left 16px
      margin-right 0
      flex-basis 0
      height 36px

    &__calories
      flex-grow 9000

    &__submit-wrapper
      display flex
</style>