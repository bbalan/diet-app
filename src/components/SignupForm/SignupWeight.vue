<template>
  <slide>
    <h1>How much do you weigh?</h1>

    <input 
      type="number" 
      v-model="Store.userInfo.weight">

    <select id="unitWeight" v-model="Store.userSettings.unitWeight">
      <option value="metric">kg</option>
      <option value="imperial">lbs</option>
    </select>

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
