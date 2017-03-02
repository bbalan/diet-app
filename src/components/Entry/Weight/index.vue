<template>
  <div class="entry--weight page page--padded page--menu">

      <h2 class="card__heading md-heading">Today's weight</h2>

      <form @submit.prevent="onSubmit">

        <!-- TODO: validation for all md-inputs -->
        <!-- TODO: @keyup.native keycode enter call onSubmit() -->
        <!-- TODO: add chart.js progress graph -->

        <md-input-container
          v-if="unitWeight == 'lbs'"
          :class="{ 'weight__lbs': true, 'weight__input': true, 'md-input-invalid': !isValidWeight }"
          ref="weight__lbs">
          <label for="weight__lbs">Weight</label>
          <md-input name="weight__lbs" v-model="weight" type="number" step="any" required @keydown.native="onKeyDown"></md-input>
        </md-input-container>

        <md-input-container
          v-if="unitWeight == 'kg'"
          :class="{ 'weight__kg': true, 'weight__input': true, 'md-input-invalid': !isValidWeight }"
          ref="weight__kg">
          <label for="weight__kg">Weight</label>
          <md-input name="weight__kg" v-model="weight" type="number" step="any" required @keydown.native="onKeyDown"></md-input>
        </md-input-container>

        <md-button @click.native="onSubmit" class="md-raised md-primary entry--weight__submit">
          Save
        </md-button>

        <md-input-container class="weight__unit">
          <md-select name="weight__unit" id="weight__unit" v-model="unitWeight">
            <md-option value="lbs">lbs</md-option>
            <md-option value="kg">kg</md-option>
          </md-select>
        </md-input-container>

      </form>

  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import Weight from 'components/Welcome/Slides/Weight'

export default {
  name: 'WeighIn',
  components: { Weight },
  methods: {
    onSubmit() {
      if (this.isValidWeight) {
        store.commit('userInfo/setWeight', this.weight)
        router.push({ name: 'log' })
      }
    },
    onKeyDown(e) {
      // TODO: disable tab for desktop?
      if (e.code === 'Enter' || e.which === 9) {
        this.onSubmit()
      }
    },
  },
  mounted() {
    const ref = this.$refs.weight__lbs || this.$refs.weight__kg
    const el = ref.$el.querySelector('input')
    el.focus()
    el.select()
  },
  computed: {
    weight: {
      get() {
        const currentDay = store.state.calendar.currentDay
        const mass = store.state.calendar.data[currentDay].userInfo.metrics.mass

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
    isValidWeight() {
      if (isNaN(parseFloat(this.weight)) || !isFinite(this.weight) || this.weight === 0) {
        return false
      }
      return true
    },
  },
}
</script>

<style scoped lang="stylus">
button
  display block

.entry--weight
  &__card
    display block
  &__submit
    position relative
    top 8px
    margin-right 0
    margin-bottom 0
    float right
    min-width 88px
    width 20%

.weight__input
  display block
  width 35%
  float left
  margin-right 8px
  margin-bottom 0

.weight__unit
  display block
  float left
  width 20%
  margin-right 8px
  margin-bottom 0
  min-width 50px
  .md-select
    min-width 0 !important
</style>
