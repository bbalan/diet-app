<template>
  <slide 
    title="How active are you?" 
    description="Your lifestyle affects your calorie needs.">
    
    <label class="activity-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="activityLevel">
      <input 
        type="radio" 
        name="activityLevel"
        id="sendentary" 
        :value="1.2" 
        v-model="activityLevel"
        class="mdl-radio__button"
        required>
      <span class="mdl-radio__label">Sendentary</span>
    </label>
    <label class="activity-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="activityLevel">
      <input 
        type="radio" 
        name="activityLevel"
        id="sendentary" 
        :value="1.4" 
        v-model="activityLevel"
        class="mdl-radio__button"
        required>
      <span class="mdl-radio__label">Active</span>
    </label>
    <label class="activity-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="activityLevel">
      <input 
        type="radio" 
        name="activityLevel"
        id="sendentary" 
        :value="1.6" 
        v-model="activityLevel"
        class="mdl-radio__button"
        required>
      <span class="mdl-radio__label">Heavy activity</span>
    </label>
    <label class="activity-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="activityLevel">
      <input 
        type="radio" 
        name="activityLevel"
        id="sendentary" 
        :value="1.8" 
        v-model="activityLevel"
        class="mdl-radio__button"
        required>
      <span class="mdl-radio__label">Intense activity</span>
    </label>
    
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
        return store.state.appSettings.activityLevel
      },
      set(activityLevel) {
        store.commit('appSettings/setActivityLevel', activityLevel)
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