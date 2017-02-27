<template>
  <slide title="How active are you?">

    <p slot="description">Your lifestyle affects your calorie needs.</p>

    <md-radio 
      type="radio" 
      name="activityLevel" 
      id="sedentary" 
      md-value="1.2" 
      v-model="activityLevel"
      class="md-primary goal-radio"
      required>Sedentary</md-radio>

    <md-radio 
      type="radio" 
      name="activityLevel" 
      id="active" 
      md-value="1.4" 
      v-model="activityLevel"
      class="md-primary goal-radio"
      required>Active</md-radio>

    <md-radio 
      type="radio" 
      name="activityLevel" 
      id="heavy-activity" 
      md-value="1.6" 
      v-model="activityLevel"
      class="md-primary gender-radio"
      required>Heavy activity</md-radio>

    <md-radio 
      type="radio" 
      name="activityLevel" 
      id="intense-activity" 
      md-value="1.8" 
      v-model="activityLevel"
      class="md-primary gender-radio"
      required>Intense activity</md-radio>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

export default {
  components: { Slide },
  computed: {
    activityLevel: {
      get() {
        return store.state.userInfo.metrics.activityLevel
      },
      set(activityLevel) {
        store.commit('userInfo/setActivityLevel', activityLevel)
      },
    },
  },
}
</script>

<style scoped lang="stylus">
.activity-radio
  display block
  text-align left
</style>