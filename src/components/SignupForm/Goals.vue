<template>
  <slide>

    <!--<h1>What are your goals?</h1>-->

    <input 
      type="radio" 
      name="goal"
      id="burn-fat" 
      value="burn-fat" 
      v-model="goal"
      required>
    <label for="burn-fat">Burn fat</label>

    <input 
      type="radio" 
      name="goal"
      id="build-muscle" 
      value="build-muscle" 
      v-model="goal"
      required>
    <label for="build-muscle">Build muscle</label>

    <input 
      type="radio" 
      name="goal"
      id="maintain-weight" 
      value="maintain-weight" 
      v-model="goal"
      required>
    <label for="maintain-weight">Maintain weight</label>

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
    goal: {
      get() {
        return store.state.appSettings.goal
      },
      set(goal) {
        store.commit('appSettings/setGoal', goal)
      },
    },
  },
}
</script>

<style scoped lang="stylus">

</style>
