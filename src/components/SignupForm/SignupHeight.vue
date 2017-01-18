<template>
  <slide class="slide--height">
    <h1>How tall are you?</h1>

    <select 
      v-if="unitHeight == 'metric'"
      id="height" 
      v-model="Store.userInfo.height">

      <option 
        v-for="height in heightsMetric" 
        :value="height">
        {{ height }}
      </option>

    </select>

    <select 
      v-else
      id="height" 
      v-model="Store.userInfo.height">

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
import Slide from './../Slide/Slide';
import Store from './../../util/Store';

export default {
  name: 'SignupHeight',
  data() {
    return {
      Store,
      unitHeight: 'imperial',
    };
  },
  components: {
    Slide,
  },
  watch: {
    /** Round metric height unit to nearest imperial unit. */
    unitHeight(unit) {
      // Switched to imperial units, round value.
      if (unit === 'imperial') {
        const height = this.Store.userInfo.height;
        const roundedHeight = Math.floor(Math.floor(height / 2.54) * 2.54);
        this.Store.userInfo.height = roundedHeight;
        this.Store.userSettings.unitHeight = unit;
      }
    },
  },
  computed: {
    /**
     * Generates a reasonable range of body heights, displayed in imperial units (e.g. 5'9").
     * For use in a v-for loop that generates <option> tags.
     * <option> values are expressed in metric units. */
    heightsImperial() {
      const inchesMin = 48; // shortest person in world: 21"
      const inchesMax = 84; // tallest person ever: 107"
      const heightStrings = [];

      for (let i = inchesMin; i <= inchesMax; i += 1) {
        const feet = Math.floor(i / 12);
        const inches = i % 12;

        heightStrings.push({
          label: `${feet}'${inches}"`, // height as imperial units (inches)
          value: Math.floor(i * 2.54), // height in metric units (cm)
        });
      }

      return heightStrings;
    },
    /** Generates a range of heights in cm. */
    heightsMetric() {
      const heights = [];

      for (let h = 120; h <= 215; h += 1) {
        heights.push(h);
      }

      return heights;
    },
  },
};
</script>

<style scoped>

</style>
