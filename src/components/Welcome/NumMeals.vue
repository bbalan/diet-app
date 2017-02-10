<template>
  <slide :last="true">

    <!--<h1>How many meals would you like to eat per day?</h1>-->

    <label for="numMeals">Number of meals:</label>
    <input name="numMeals" type="number" min="1" max="10" v-model="numMeals">

    
  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  components: { Slide },
  computed: {
    numMeals: {
      get: () => store.state.appSettings.numMeals,
      set(numMeals) {
        store.commit('appSettings/setNumMeals', numMeals)
      },
    },
  },
}
</script>
