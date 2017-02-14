<template>
  <slide title="How many meals per day?">

    <div slot="description">
      <p>Most people eat 3 meals per day.</p>
      <p>The recommended number is 5 or 6 &mdash; smaller meals, eaten more frequently.</p>
    </div>

    <md-input-container>
      <label>Number of meals per day</label>
      <md-input v-model="numMeals" type="number" min="2" max="10" required></md-input>
      <span class="md-error">That's not a number.</span>
    </md-input-container>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

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
</style>