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
