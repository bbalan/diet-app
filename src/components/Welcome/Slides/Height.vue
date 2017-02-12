<template>
  <slide title="How tall are you?" description="Taller people burn more calories.">

    <div class="slide__inputs">
      <div 
        v-if="unitHeight === 'cm'"
        class="height--textfield height__cm mdl-textfield mdl-js-textfield">
        <input v-model.number="height" class="mdl-textfield__input" type="number" id="height">
        <!--<label class="mdl-textfield__label" for="height">Height (cm)</label>-->
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>

      <div 
        v-if="unitHeight === 'ft'"
        class="height--textfield mdl-textfield mdl-js-textfield getmdl-select getmdl-select__fix-height">

        <select 
          class="height-select" 
          v-model="height">

          <option 
            v-for="height in heightsImperial" 
            :value="height.value">
            {{ height.label }}
          </option>

        </select>

        <input 
          class="mdl-textfield__input" 
          type="text" 
          id="heightFt" 
          :value="heightInFt"
          readonly 
          tabIndex="-1">
        <!--<label for="heightFt">
          <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
        </label>-->
        
      </div>

      <div class="unit--textfield mdl-textfield mdl-js-textfield getmdl-select getmdl-select__fix-height">
        <input 
          class="mdl-textfield__input" 
          type="text" 
          id="unitHeight" 
          :value="unitHeight" 
          readonly 
          tabIndex="-1">
        <label for="unitHeight">
          <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
        </label>
        <ul for="unitHeight" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
          <li class="mdl-menu__item" @click="setUnitHeight('ft')">ft</li>
          <li class="mdl-menu__item" @click="setUnitHeight('cm')">cm</li>
        </ul>
      </div>
    </div>
    
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
        return store.state.userInfo.metrics.height
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
.height--textfield
  width 70px
.unit--textfield
  width 50px
.height-select
  position absolute
  top 20px
  left 0
  width 100%
  height 30px
  z-index 100
  opacity 0
  outline 0
</style>