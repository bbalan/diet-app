<template>
  <div>
    <food
      v-if="isFood"
      :id="foodID"
      :source="foodSource"
      :entryUUID="entryUUID"
      ></food>
    <exercise
      v-if="isExercise"
      :entryUUID="entryUUID">
    </exercise>
    <div v-if="!dataEntry && !isFood">
      Entry not found
      <pre>{{entries}}</pre>
    </div>
  </div>
</template>

<script>
import store from 'store'
import Food from 'components/Entry/Food'
import Exercise from 'components/Entry/Exercise'

export default {
  name: 'Entry',
  props: ['entryUUID', 'foodID', 'foodSource'],
  data() {
    return {
      mass: 100,
    }
  },
  components: { Food, Exercise },
  computed: {
    entries() {
      return store.state.entries.data
    },
    dataEntry() {
      return this.entries[this.entryUUID]
    },
    entryType() {
      return this.dataEntry ? this.dataEntry.type : false
    },
    isFood() {
      return this.entryType === 'food' || (this.foodID && this.foodSource)
    },
    isExercise() {
      return this.entryType === 'exercise'
    },
  },
}
</script>
