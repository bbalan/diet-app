<template>
  <div class="entry--workout">

    <md-card>

      <md-card-header class="md-title entry-name wordwrap--fade workout-name">
        New Workout
      </md-card-header>

      <md-card-content>

        <view-workout
          submitText="Add"
          @submit="onSubmit">
        </view-workout>

      </md-card-content>
    </md-card>

  </div>
</template>

<script>
// TODO: add workout notes field
import store from 'store'
import router from 'router'
import ViewWorkout from 'components/Entry/Common/Workout'

export default {
  name: 'AddWorkout',
  components: { ViewWorkout },
  methods: {
    onSubmit(data) {
      store.dispatch('workouts/add', {
        name: data.name,
        calories: data.calories,
        addEntry: true,
      })

      router.go(-9000)
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
    margin-top 0 !important
    margin-bottom 4px !important

  .inputs__submit
    position relative
    top 4px
    margin-left 16px
    margin-right 0

  .inputs__submit-wrapper
    display flex
</style>