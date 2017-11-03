<template>
  <slide title="How much do you weigh?" class="slide--weight">

    <div v-if="weighIn === undefined" slot="description">
      <p>Your weight affects the number of calories you burn.</p>
      <p>If you don't already own a bathroom scale, get one.</p>
    </div>

    <md-input-container
      v-if="unitWeight == 'lbs'"
      class="weight__lbs weight__input">
      <label for="weight__lbs">Weight</label>
      <md-input name="weight__lbs" v-model="weight" type="number" step="any"></md-input>
    </md-input-container>

    <md-input-container
      v-if="unitWeight == 'kg'"
      class="weight__kg weight__input">
      <label for="weight__kg">Weight</label>
      <md-input name="weight__kg" v-model="weight" type="number" step="any"></md-input>
    </md-input-container>

    <md-input-container class="weight__unit">
      <!--<label for="weight__unit">Unit</label>-->
      <md-select name="weight__unit" id="weight__unit" v-model="unitWeight">
        <md-option value="lbs">lbs</md-option>
        <md-option value="kg">kg</md-option>
      </md-select>
    </md-input-container>

  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

export default {
  props: ['weighIn'],
  components: { Slide },
  methods: {
    setUnitWeight(val) {
      this.unitWeight = val
    },
  },
  computed: {
    weight: {
      get() {
        const mass = store.state.userInfo.mass

        if (mass === null || mass === undefined) return mass

        let weight

        if (store.state.config.unitWeight === 'kg') {
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
        return store.state.config.unitWeight
      },
      set(unitWeight) {
        store.commit('config/setUnitWeight', unitWeight)
      },
    },
  },
}
</script>

<style scoped lang="stylus">
.weight__input
  width 75%
  float left
  position absolute

.weight__unit
  position absolute
  right 0
  width 20%
  .md-select
    min-width 0 !important
</style>