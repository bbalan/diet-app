<template>
  <slide class="slide--height">
    <h1>How tall are you?</h1>

    {{height}}

    <select 
      v-if="unitHeight == 'metric'"
      id="height" 
      v-model="height">

      <option 
        v-for="height in heightsMetric" 
        :value="height">
        {{ height }}
      </option>

    </select>

    <select 
      v-else
      id="height" 
      v-model="height">

      <option 
        v-for="height in heightsImperial" 
        :value="height.value">
        {{ height.label }}
      </option>

    </select>

    <select id="unitHeight" v-model="unitHeight">
      <option value="metric">cm</option>
      <option value="imperial">ft</option>
    </select>

    <button class="btn--next">Next</button>
  </slide>
</template>

<script>
import store from './../../store'

import Slide from './../Slide'

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
        return store.state.appSettings.unitHeight
      },
      set(unitHeight) {
        store.commit('appSettings/setUnitHeight', unitHeight)
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
        const inches = i % 12

        heightStrings.push({
          label: `${feet}'${inches}"`, // height as imperial units (inches)
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
  },
}
</script>
