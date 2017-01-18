<template>
  <slide>
    <h1>What are your goals?</h1>

    <input 
      type="radio" 
      id="burn-fat" 
      value="burn-fat" 
      v-model="Store.userInfo.goal">
    <label for="burn-fat">Burn fat</label>

    <input 
      type="radio" 
      id="build-muscle" 
      value="build-muscle" 
      v-model="Store.userInfo.goal">
    <label for="build-muscle">Build muscle</label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import Slide from './../Slide/Slide';
import Store from './../../util/Store';

export default {
  name: 'SignupGoals',
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
