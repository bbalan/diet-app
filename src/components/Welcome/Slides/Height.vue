<template>
  <slide title="How tall are you?" class="slide--height">

    <p slot="description">Taller people burn more calories.</p>

    <md-input-container
      v-if="unitHeight == 'cm'"
      class="height__cm height__input">
      <label for="height__cm">Height</label>
      <md-input name="height__cm" v-model="height"></md-input>
    </md-input-container>

    <div class="height__ft height__input">

      <md-input-container v-if="unitHeight == 'ft'">

        <select v-model="height" class="height__ft--hidden">
          <option
              v-for="height in heightsImperial"
              :value="height.value">
              {{ height.label }}
          </option>
        </select>

        <label for="height__ft">Height</label>
        <md-select name="height__ft" id="height__ft" v-model="height">
          <md-option
            v-for="height in heightsImperial"
            :value="height.value">
              {{ height.label }}
          </md-option>
        </md-select>
      </md-input-container>
    </div>

    <md-input-container class="height__unit">
      <md-select name="height__unit" id="height__unit" v-model="unitHeight">
        <md-option value="ft">ft in</md-option>
        <md-option value="cm">cm</md-option>
      </md-select>
    </md-input-container>

  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

export default {
  name: 'Height',
  components: {
    Slide,
  },
  computed: {
    height: {
      get() {
        return store.state.userInfo.height
      },
      set(height) {
        store.commit('userInfo/setHeight', height)
      },
    },
    unitHeight: {
      get() {
        return store.state.config.unitHeight
      },
      set(unitHeight) {
        store.commit('config/setUnitHeight', unitHeight)
      },
    },
    /**
     * Generates a reasonable range of body heights, displayed in imperial units (e.g. 5'9").
     * For use in a v-for loop that generates <option> tags.
     * <option> values are expressed in metric units. */
    heightsImperial() {
      const inchesMin = 48 // shortest person in world: 21"
      const inchesMax = 84 // tallest person ever: 107"
      const heightStrings = []

      for (let i = inchesMin; i <= inchesMax; i += 1) {
        const feet = Math.floor(i / 12)
        const inches = Math.floor(i % 12)

        heightStrings.push({
          label: `${feet}' ${inches}"`, // height as imperial units (inches)
          value: Math.floor(i * 2.54), // height in metric units (cm)
        })
      }

      return heightStrings
    },
    /** Generates a range of heights in cm. */
    heightsMetric() {
      const heights = []

      for (let h = 120; h <= 215; h += 1) {
        heights.push(h)
      }

      return heights
    },
    heightInFt() {
      const heightIn = this.height / 2.54
      let feet = Math.floor(heightIn / 12)
      let inches = Math.round(heightIn % 12)

      if (inches === 12) {
        inches = 0
        feet += 1
      }

      return `${feet}' ${inches}"`
    },
  },
  methods: {
    setUnitHeight(unit) {
      this.unitHeight = unit
    },
    setHeight(val) {
      this.height = val
    },
  },
}
</script>

<style scoped lang="stylus">
.height__ft
  &--hidden
    padding 0
    margin 0
    background red
    opacity 0
    z-index 100

    width 100%
    height 32px
    position absolute
    bottom 0
    left 0

.height__input
  width 75%
  float left
  position absolute

.height__unit
  position absolute
  right 0
  width 20%
  .md-select
    min-width 0 !important
</style>