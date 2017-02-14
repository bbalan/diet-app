<template>
  <slide title="What are your goals?">

    <p slot="description">This will affect how much you can eat.</p>

    <md-radio 
      type="radio" 
      name="goal" 
      id="burn-fat" 
      md-value="burn-fat" 
      v-model="goal"
      class="md-primary goal-radio"
      required>Burn fat</md-radio>

    <md-radio 
      type="radio" 
      name="goal" 
      id="build-muscle" 
      md-value="build-muscle" 
      v-model="goal"
      class="md-primary goal-radio"
      required>Build muscle</md-radio>

    <md-radio 
      type="radio" 
      name="goal" 
      id="maintain-weight" 
      md-value="maintain-weight" 
      v-model="goal"
      class="md-primary goal-radio"
      required>Maintain weight</md-radio>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

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
