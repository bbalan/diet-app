<template>
  <div>
    <!--<h2>Entry {{ entryUUID }}</h2>-->
    <!--<pre>{{ dataEntry }}</pre>-->
    <!--<pre>{{ dataFood }}</pre>-->
    <food 
      v-if="isFood"
      :id="foodID"
      :source="foodSource"
      :entryUUID="entryUUID"
      ></food>
  </div>
</template>

<script>
import store from 'store'
import Food from 'components/Entry/Food'

export default {
  name: 'Entry',
  props: ['entryUUID', 'foodID', 'foodSource'],
  data() {
    return {
      mass: 100,
    }
  },
  components: { Food },
  computed: {
    dataEntry() {
      return store.state.entries.data[this.entryUUID]
    },
    entryType() {
      return this.dataEntry ? this.dataEntry.type : false
    },
    isFood() {
      return this.entryType === 'food' || (this.foodID && this.foodSource)
    },
  },
}
</script>
