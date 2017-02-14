<template>
  <slide title="What is your gender?" class="slide--gender">

    <p slot="description">This is required to calculate your basal metabolic rate.</p>

    <md-radio 
      type="radio" 
      name="gender" 
      id="gender-male" 
      md-value="male" 
      v-model="gender"
      class="md-primary gender-radio"
      required>Male</md-radio>

    <md-radio 
      type="radio" 
      name="gender" 
      id="gender-female" 
      md-value="female" 
      v-model="gender"
      class="md-primary gender-radio"
      required>Female</md-radio>

  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

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

<style lang="stylus">
</style>