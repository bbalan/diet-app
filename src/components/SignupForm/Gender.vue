<template>
  <slide>
    <h1>What is your gender?</h1>
    <p>Your gender is needed to accurately calculate your basal metabolic rate (BMR).</p>

    <input 
      type="radio" 
      name="gender" 
      id="gender-male" 
      value="male" 
      v-model="gender">
    <label for="male">Male</label>

    <input 
      type="radio" 
      name="gender" 
      id="gender-female" 
      value="female" 
      v-model="gender">
    <label for="female">Female</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from './../../store'
import Slide from './../Slide'

export default {
  name: 'SignupGender',
  components: {
    Slide,
  },
  computed: {
    gender: {
      get() {
        return store.state.userInfo.gender
      },
      set(value) {
        store.commit('userInfo/setGender', value)
      },
    },
  },
}
</script>
