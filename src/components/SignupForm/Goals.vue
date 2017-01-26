<template>
  <slide>
    <h1>What are your goals?</h1>

    <input 
      type="radio" 
      id="burn-fat" 
      value="burn-fat" 
      v-model="goal">
    <label for="burn-fat">Burn fat</label>

    <input 
      type="radio" 
      id="build-muscle" 
      value="build-muscle" 
      v-model="goal">
    <label for="build-muscle">Build muscle</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from '../../store'
import Slide from './../Slide'

export default {
  components: {
    Slide,
  },
  computed: {
    goal: {
      get() {
        return store.state.userInfo.goal
      },
      set(goal) {
        store.commit('userInfo/setGoal', goal)
      },
    },
  },
}
</script>

<style scoped>

</style>
