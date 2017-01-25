<template>
  <slide class="slide--age">

    <h1>When is your birthday?</h1>

    <input 
      id="birthday" 
      type="date" 
      :value="birthday" 
      @change="onBirthdayChange">

    <button class="btn--next">
      Next
    </button>

  </slide>
</template>

<script>
import { mapState } from 'vuex';

import Slide from './../Slide/Slide';
import store from './../../store';

export default {
  components: {
    Slide,
  },
  computed: {
    ...mapState('UserInfo', [
      'birthday',
    ]),
  },
  methods: {
    onBirthdayChange(e) {
      store.commit('UserInfo/setBirthday', e.target.value);
    },
  },
};
</script>

<style scoped>

</style>
