<template>
  <slide>
    <h1>What is your gender?</h1>
    <p>Your gender is needed to accurately calculate your basal metabolic rate (BMR).</p>

    <input 
      type="radio" 
      id="male" 
      value="male" 
      v-model="Store.userInfo.gender">
    <label for="male">Male</label>

    <input 
      type="radio" 
      id="female" 
      value="female" 
      v-model="Store.userInfo.gender">
    <label for="female">Female</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import Slide from './../Slide/Slide';
import Store from './../../util/Store';

export default {
  name: 'SignupGender',
  data() {
    return {
      Store,
    };
  },
  components: {
    Slide,
  },
};
</script>

<style scoped>

</style>
