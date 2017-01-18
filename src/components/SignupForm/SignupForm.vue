<!-- This component handles the initial user signup. -->

<template>
  <div id="SignupForm">
    <form @submit.prevent="onSubmit">

      <slide class="slide--age">
        <h1>When is your birthday?</h1>

        <input type="date" id="birthday"></input>

        <button class="btn--next">Next</button>
      </slide>

      <slide class="slide--height">
        <h1>How tall are you?</h1>

        <select 
          id="height" 
          v-if="Store.userSettings.unitHeight == 'metric'">
          <option 
            v-for="height in heightsMetric" 
            :selected="height == defaultHeightMetric">
            {{ height }}
          </option>
        </select>

        <select id="height" v-else>
          <option 
            v-for="height in heightsImperial" 
            :selected="height == defaultHeightImperial" 
            :value="height.value">
            {{ height.label }}
          </option>
        </select>

        <select id="unitHeight" v-model="Store.userSettings.unitHeight">
          <option value="metric">cm</option>
          <option value="imperial">ft</option>
        </select>

        <button class="btn--next">Next</button>
      </slide>

      <slide>
        <h1>What is your gender?</h1>

        <input 
          type="radio" 
          id="male" 
          value="male" 
          v-model="Store.userInfo.gender">
        <label for="male">Male</label>

        <input 
          type="radio" 
          id="female" 
          value="female" 
          v-model="Store.userInfo.gender">
        <label for="female">Female</label>

        <button class="btn--next">Next</button>
      </slide>

      <slide>
        <h1>How much do you weigh?</h1>

        <input type="number">

        <select id="unitWeight" v-model="Store.userSettings.unitWeight">
          <option value="metric">kg</option>
          <option value="imperial">lbs</option>
        </select>

        <button class="btn--next">Next</button>
      </slide>

      <slide>
        <h1>What are your goals?</h1>

        <input 
          type="radio" 
          id="burn-fat" 
          value="burn-fat" 
          v-model="Store.userInfo.goal">
        <label for="burn-fat">Burn fat</label>

        <input 
          type="radio" 
          id="build-muscle" 
          value="build-muscle" 
          v-model="Store.userInfo.goal">
        <label for="build-muscle">Build muscle</label>

        <button class="btn--next">Next</button>
      </slide>
      
      <slide>
        <h1>What is your activity level?</h1>

        <input 
          type="range" 
          min=1
          max=3
          step=1
          id="activityLevel"
          v-model="Store.userInfo.activityLevel">
        <label for="activityLevel">
          <span v-if="Store.userInfo.activityLevel == 1">
            Sedentary
          </span>
          <span v-if="Store.userInfo.activityLevel == 2">
            Light activity
          </span>
          <span v-if="Store.userInfo.activityLevel == 3">
            Heavy activity
          </span>
        </label>

        <button class="btn--next">Next</button>
      </slide>

    </form>
  </div>
</template>

<script>
import './SignupForm.styl';

import Store from './../../util/Store';
import Slide from './../Slide/Slide';

export default {
  name: 'SignupForm',
  data() {
    return {
      Store,
      gender: null,
      defaultHeightMetric: 175,
      defaultHeightImperial: '5\'10"',
    };
  },
  components: {
    Slide,
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
          label: `${feet}'${inches}"`, // height as imperial units
          value: Math.floor(i * 2.54), // height in metric
        });
      }

      return heightStrings;
    },
    /** Generates a range of heights in cm. */
    heightsMetric() {
      const heights = [];

      for (let h = 120; h <= 215; h += 5) {
        heights.push(h);
      }

      return heights;
    },
  },
  methods: {
    onSubmit() {
      console.log('Submitted');
    },
  },
};
</script>
