<template>
  <slide>
    <h1>Save your info</h1>
    <p>Create an account to save your progress!</p>

    <p>
      <label for="signupEmail">Email</label>
      <input type="email" id="signupEmail">
    </p>
    <p>
      <label for="signupPassword">Password</label>
      <input type="password" id="signupPassword">
    </p>

    <input type="submit">
  </slide>
</template>

<script>
import Store from './../../util/Store';
import Slide from './../Slide/Slide';

export default {
  name: 'SignupCredentials',
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