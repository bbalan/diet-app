<template>
  <slide>

    <!--<h1>How much do you weigh?</h1>-->

    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="number" step="0.1" id="weight" v-model.number="weight">
      <label class="mdl-textfield__label" for="weight">Your current weight</label>
      <span class="mdl-textfield__error">Please enter a number</span>
    </div>

    <select id="unitWeight" v-model="unitWeight">
      <option value="metric">kg</option>
      <option value="imperial">lbs</option>
    </select>

    <button class="btn--next">Next</button>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  components: { Slide },
  computed: {
    weight: {
      get() {
        const mass = store.state.userInfo.metrics.mass
        let weight

        if (store.state.appSettings.unitWeight === 'metric') {
          weight = Math.round(mass * 10) / 10
        } else {
          weight = Math.round(mass * 2.20462 * 10) / 10
        }

        return weight
      },
      set(weight) {
        store.commit('userInfo/setWeight', weight)
      },
    },
    unitWeight: {
      get() {
        return store.state.appSettings.unitWeight
      },
      set(unitWeight) {
        store.commit('appSettings/setUnitWeight', unitWeight)
      },
    },
  },
}
</script>
