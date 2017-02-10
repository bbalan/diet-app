<template>
  <slide>

    <!--<h1>Do you know your body fat percentage?</h1>-->
    Body fat?
    <input 
      type="radio" 
      name="knowBodyFat" 
      id="knowBodyFat-yes" 
      :value="true" 
      v-model="knowBodyFat"
      required>
    <label for="yes">Yes</label>

    <span v-if="knowBodyFat" class="bodyFat">
      <input type="number" v-model="bodyFatPct"> %
    </span>

    <input 
      type="radio" 
      name="knowBodyFat" 
      id="knowBodyFat-no" 
      :value="false" 
      v-model="knowBodyFat"
      required>
    <label for="no">No</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Slide'

export default {
  components: { Slide },
  data() {
    return { knowBodyFat: true }
  },
  computed: {
    bodyFatPct: {
      get() {
        return store.state.userInfo.metrics.bodyFatPct
      },
      set(bodyFatPct) {
        store.commit('userInfo/setBodyFatPct', this.knowBodyFat ? bodyFatPct : null)
      },
    },
  },
  watch: {
    knowBodyFat(knowBodyFat) {
      store.commit('userInfo/setBodyFatPct', knowBodyFat ? this.bodyFatPct : null)
    },
  },
}
</script>
