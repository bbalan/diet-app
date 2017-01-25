<template>
  <slide>
    <h1>What is your gender?</h1>
    <p>Your gender is needed to accurately calculate your basal metabolic rate (BMR).</p>

    <input 
      type="radio" 
      name="gender" 
      id="gender-male" 
      value="male" 
      :checked="gender == 'male'"
      @change="onGenderChange">
    <label for="male">Male</label>

    <input 
      type="radio" 
      name="gender" 
      id="gender-female" 
      value="female" 
      :checked="gender == 'female'"
      @change="onGenderChange">
    <label for="female">Female</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import { mapState } from 'vuex';
import store from './../../store';

import Slide from './../Slide/Slide';

export default {
  name: 'SignupGender',
  components: {
    Slide,
  },
  computed: {
    ...mapState('userInfo', [
      'gender',
    ]),
  },
  methods: {
    onGenderChange(e) {
      store.commit('userInfo/setGender', e.target.value);
    },
  },
};
</script>
