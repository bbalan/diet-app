<template>
  <slide>
    <h1>What is your activity level?</h1>

    <input 
      type="range" 
      min=1
      max=3
      step=1
      id="activityLevel"
      v-model.number="activityLevel">
    <label for="activityLevel">
      <span v-if="activityLevel == 1">
        Sedentary
      </span>
      <span v-if="activityLevel == 2">
        Light activity
      </span>
      <span v-if="activityLevel == 3">
        Heavy activity
      </span>
    </label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  components: {
    Slide,
  },
  computed: {
    activityLevel: {
      get() {
        return store.state.userInfo.activityLevel
      },
      set(activityLevel) {
        store.commit('userInfo/setActivityLevel', activityLevel)
      },
    },
  },
}
</script>
