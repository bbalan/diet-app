<template>
  <slide class="slide--age">

    <h1>When is your birthday?</h1>

    <input 
      type="date" 
      id="birthday" 
      v-model="birthday">

    <button class="btn--next">
      Next
    </button>

  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  components: {
    Slide,
  },
  computed: {
    birthday: {
      get() {
        return store.state.userInfo.birthday
      },
      set(birthday) {
        store.commit('userInfo/setBirthday', birthday)
      },
    },
  },
}
</script>
