<template>
  <slide title="How many meals per day?">

    <div slot="description">
      <p>Most people eat 3 meals per day.</p>
      <p>However, smaller meals, eaten more frequently, are better for keeping hunger down.</p>
      <p>The recommended number of meals is 5 or 6.</p>
    </div>

    <md-input-container ref="numMealsInput">
      <label>Number of meals per day</label>
      <md-input v-model="numMeals" type="number" min="2" max="10" required placeholder="3" @focus.native="onFocusInput('numMealsInput')"></md-input>
      <span class="md-error">That's not a number.</span>
    </md-input-container>

  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'
import { onFocusInput } from 'util'

export default {
  components: { Slide },
  computed: {
    numMeals: {
      get: () => store.state.userInfo.numMeals,
      set(numMeals) {
        store.commit('userInfo/setNumMeals', numMeals)
      },
    },
  },
  methods: {
    onFocusInput,
  },
}
</script>

<style scoped lang="stylus">
</style>