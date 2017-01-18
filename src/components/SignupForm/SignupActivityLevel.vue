<template>
  <slide>
    <h1>What is your activity level?</h1>

    <input 
      type="range" 
      min=1
      max=3
      step=1
      id="activityLevel"
      v-model.number="Store.userInfo.activityLevel">
    <label for="activityLevel">
      <span v-if="Store.userInfo.activityLevel == 1">
        Sedentary
      </span>
      <span v-if="Store.userInfo.activityLevel == 2">
        Light activity
      </span>
      <span v-if="Store.userInfo.activityLevel == 3">
        Heavy activity
      </span>
    </label>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import Slide from './../Slide/Slide';
import Store from './../../util/Store';

export default {
  name: 'SignupActivityLevel',
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
