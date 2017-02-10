<template>
  <slide class="settings--gender">
    <h4>What is your gender?</h4>
    <!--<p>Your gender is needed to accurately calculate your basal metabolic rate (BMR).</p>-->

    <div class="gender__radio-buttons">
      <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="gender-male">
        <input 
          type="radio" 
          name="gender" 
          id="gender-male" 
          value="male" 
          v-model="gender"
          class="mdl-radio__button"
          required>
        <span class="mdl-radio__label">Male</span>
      </label>
      <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="gender-female">
        <input 
          type="radio" 
          name="gender" 
          id="gender-female" 
          value="female" 
          v-model="gender"
          class="mdl-radio__button"
          required>
        <span class="mdl-radio__label">Female</span>
      </label>
    </div>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  name: 'SignupGender',
  components: {
    Slide,
  },
  computed: {
    gender: {
      get() {
        return store.state.userInfo.metrics.gender
      },
      set(value) {
        store.commit('userInfo/setGender', value)
      },
    },
  },
}
</script>

<style scoped lang="stylus">
.mdl-radio
  display block
.gender__radio-buttons
  display inline-block
  text-align left
</style>