<template>
  <slide>

    <h4>How much do you weigh?</h4>
    <p>Your weight also affects the number of calories you burn.</p>

    <div class="slide__inputs">
      <div class="weight--textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="number" step=".1" id="weight" v-model.number="weight">
        <!--<label class="mdl-textfield__label" for="weight">Weight</label>-->
        <span class="mdl-textfield__error">Please enter a number</span>
      </div>

      <div class="unit--textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height">
        <input class="mdl-textfield__input" type="text" id="sample2" v-model="unitWeight" readonly tabIndex="-1">
        <label for="sample2">
          <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
        </label>
        <!--<label for="sample2" class="mdl-textfield__label">Unit</label>-->
        <ul for="sample2" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
          <li class="mdl-menu__item" @click="setUnitWeight('lbs')">lbs</li>
          <li class="mdl-menu__item" @click="setUnitWeight('kg')">kg</li>
        </ul>
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
    weight: {
      get() {
        const mass = store.state.userInfo.metrics.mass

        if (mass === null || mass === undefined) return mass

        let weight

        if (store.state.appSettings.unitWeight === 'kg') {
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
  methods: {
    setUnitWeight(val) {
      this.unitWeight = val
    },
  },
}
</script>

<style scoped lang="stylus">
.weight--textfield
  width 70px
.unit--textfield
  width 50px
</style>