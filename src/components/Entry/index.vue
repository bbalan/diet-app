<template>
  <div>
    <food
      v-if="isFood"
      :id="foodID"
      :source="foodSource"
      :uuid="uuid"
      ></food>
    <workout
      v-if="isWorkout"
      :uuid="uuid">
    </workout>
    <div v-if="!dataEntry && !isFood">
      Entry not found
      <pre>{{entries}}</pre>
    </div>
  </div>
</template>

<script>
import store from 'store'
import Food from 'components/Entry/Food'
import Workout from 'components/Entry/Workout'

export default {
  name: 'Entry',
  props: ['uuid', 'foodID', 'foodSource'],
  data() {
    return {
      mass: 100,
    }
  },
  components: { Food, Workout },
  computed: {
    entries() {
      return store.state.entries
    },
    dataEntry() {
      return this.entries[this.uuid]
    },
    entryType() {
      return this.dataEntry ? this.dataEntry.type : false
    },
    isFood() {
      return this.entryType === 'food' || (this.foodID && this.foodSource)
    },
    isWorkout() {
      return this.entryType === 'workout'
    },
  },
}
</script>

<style lang="stylus">

.entry-name
  margin-bottom 16px

.food-entry
.workout-entry
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  border-top 64px solid #eee
  background white
  overflow-x hidden
  overflow-y scroll

  .inputs
    margin 0 0 32px 0
    position relative
    &__submit
      margin-bottom 0
    &__mass
    &__calories
      border-right 110px solid transparent
      margin-bottom 16px
    &__eat
      position absolute
      bottom 0
      right 0
      margin-right 0
.mass__unit
.calories__unit
  height 0
  line-height 1em
  position absolute
  bottom 24px
  right 0
</style>