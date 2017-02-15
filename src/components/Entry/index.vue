<template>
  <div class="entry-root grid__outer">
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
    <div class="grid__outer">
      <div v-if="!dataEntry && !isFood" class="md-display-1">
        <md-icon>warning</md-icon>
        Entry not found
      </div>
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
.entry-root
  position absolute !important
  top 0
  left 0
  width 100%
  height 100%
  border-top 56px solid transparent
  background white
  overflow-x hidden
  overflow-y scroll

.entry-name
  margin-bottom 16px
  width 100%
  overflow hidden
  position relative
  &:after
    pointer-events none
    display block
    content ''
    width 50px
    height 100%
    position absolute
    top 0
    right 0
    background linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)

.workout-entry
  .entry-name
    border-right 32px solid transparent
  .md-icon.workout__edit
    position absolute
    right 0
    top 0

  .inputs
    margin 0
    position relative
    &__submit
      margin-bottom 0
    &__mass
    &__calories
      border-right 110px solid transparent
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
  bottom 22px
  right 0
  opacity 0
  transition all .2s

.md-input-focused
.md-has-value
  .calories__unit
    opacity 1
</style>