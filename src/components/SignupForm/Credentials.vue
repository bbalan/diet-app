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
import Slide from './../Slide'

export default {
  components: {
    Slide,
  },
}
</script>

<style scoped>

</style>