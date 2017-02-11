<template>
  <slide>

    <h4>What are your goals?</h4>
    <p>This will affect how much you can eat.</p>

    <div class="slide__inputs">
      <label class="goal-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="burn-fat">
        <input 
          type="radio" 
          name="goal"
          id="burn-fat" 
          value="burn-fat" 
          v-model="goal"
          class="mdl-radio__button"
          required>
        <span class="mdl-radio__label">Burn fat</span>
      </label>
      <label class="goal-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="build-muscle">
        <input 
          type="radio" 
          name="goal"
          id="build-muscle" 
          value="build-muscle" 
          v-model="goal"
          class="mdl-radio__button"
          required>
        <span class="mdl-radio__label">Build muscle</span>
      </label>
      <label class="goal-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="maintain-weight">
        <input 
          type="radio" 
          name="goal"
          id="maintain-weight" 
          value="maintain-weight" 
          v-model="goal"
          class="mdl-radio__button"
          required>
        <span class="mdl-radio__label">Maintain weight</span>
      </label>
    </div>
    
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
.goal-radio
  display block
  text-align left
</style>
