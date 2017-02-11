<template>
  <slide :last="true">

    <h4>How many meals per day would you like to eat?</h4>
    <p>Smaller, frequent meals are better than bigger, infrequent meals.</p>

    <p>The recommended number is 5 or 6.</p>

    <div class="slide__inputs">
      <div class="numMeals mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="number" min="2" max="10" v-model="numMeals" id="numMeals">
        <label class="mdl-textfield__label" for="numMeals">Number of meals</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
    </div>
    
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

<style scoped lang="stylus">
.numMeals
  max-width 100px
</style>