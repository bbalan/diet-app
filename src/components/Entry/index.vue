<template>
  <div class="entry-root grid__outer">
    <food
      v-if="isFood"
      :id="id"
      :source="source"
      :uuid="uuid"
      ></food>
    <workout
      v-if="isWorkout"
      :uuid="uuid">
    </workout>
    <div v-if="!dataEntry && !isFood" class="grid__outer">
      <div class="md-display-1">
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
  props: ['uuid', 'id', 'source'],
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
      return this.entryType === 'food' || (this.id && this.source)
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
    width 25px
    height 100%
    position absolute
    top 0
    right 0
    background linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)

.workout-entry
.workout--preset
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
  .mass__unit
  .calories__unit
    opacity 1
</style>