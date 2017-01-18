<template>
  <slide class="slide--age">
    <h1>When is your birthday?</h1>

    <input 
      type="date" 
      id="birthday"
      v-model="signupBirthday">

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import Slide from './../Slide/Slide';
import Store from './../../util/Store';

export default {
  name: 'SignupBirthday',
  data() {
    return {
      Store,
      signupBirthday: null,
    };
  },
  components: {
    Slide,
  },
  watch: {
    /** Translates the user's birthday into a timestamp, and calculates their age. */
    signupBirthday(date) {
      const today = new Date().getTime();
      const birthday = new Date(date).getTime();
      const secondsInAYear = 365 * 24 * 60 * 60;
      const age = Math.round(((today - birthday) / secondsInAYear / 1000) * 10) / 10;

      this.Store.userInfo.birthday = birthday;
      this.Store.userInfo.age = age;
    },
  },
};
</script>

<style scoped>

</style>
