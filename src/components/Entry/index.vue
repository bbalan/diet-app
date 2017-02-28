<template>
  <div class="entry-root page--menu">
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
    <div v-if="!dataEntry && !isFood" class="page--padded">
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
import * as API from 'api'

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
      return this.entryType === 'food' || (!!this.id && !!this.source)
    },
    isWorkout() {
      return this.entryType === 'workout'
    },
    isCustom() {
      return this.isFood && this.source === API.CUSTOM
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
</style>