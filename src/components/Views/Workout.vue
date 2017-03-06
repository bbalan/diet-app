<template>
  <div class="view--workout">

    <form @submit.prevent>

      <div class="inputs">
        <md-input-container class="inputs__name">
          <label>Workout name</label>
          <md-input v-model="newName" ref="workoutName" @keydown.native="onKeyDown"></md-input>
        </md-input-container>

        <div class="inputs__submit-wrapper">
          <md-input-container class="inputs__calories">
            <label>Calories burned</label>
            <md-input type="number" v-model.number="newCalories" @keydown.native="onKeyDown"></md-input>
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
// TODO: add workout notes field
export default {
  name: 'ViewWorkout',
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