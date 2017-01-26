<template>
  <slide class="slide--age">

    <h1>When is your birthday?</h1>

    <input 
      type="date" 
      id="birthday" 
      :value="birthday" 
      @change="onBirthdayChange">

    <button class="btn--next">
      Next
    </button>

  </slide>
</template>

<script>
import { mapState } from 'vuex'
import store from './../../store'
import Slide from './../Slide'

export default {
  components: {
    Slide,
  },
  computed: {
    ...mapState('userInfo', [
      'birthday',
    ]),
  },
  methods: {
    onBirthdayChange(e) {
      store.commit('userInfo/setBirthday', e.target.value)
    },
  },
}
</script>
