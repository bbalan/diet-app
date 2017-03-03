<template>
  <transition name="page-fade">
    <div class="food-view page--padded">

      <form @submit.prevent>
        <div :class="`${headingClass} entry-name wordwrap--fade`">
          {{ name | capitalize }}
        </div>

        <div class="food-view__inputs">
          <md-input-container class="food-view__inputs__mass" ref="massInput">
            <label>How much?</label>
            <md-input
              type="number"
              ref="massInput"
              v-model.number="mass"
              required
              @focus.native="onFocusInput('massInput')"
              @click.native="onFocusInput('massInput')"
              @keydown.native="onKeyDown">
            </md-input>
            <span class="mass__unit input__unit">{{ unitFood }}</span>
            <span class="md-error">Please enter a number.</span>
          </md-input-container>

          <md-button
            class="md-raised md-primary food-view__inputs__eat inputs__submit"
            @click.native.prevent="onSubmit">
            {{ submitText }}
          </md-button>
        </div>

        <div class="clearfix"></div>
      </form>

      <nutrition-facts
        :nutrients="dataFood.nutrients"
        :source="food.source"
        :serving="normalizedMass">
      </nutrition-facts>

    </div>
  </transition>
</template>

<script>
import store from 'store'
import NutritionFacts from 'components/Views/NutritionFacts'
import { capitalize } from 'util/filters'
import { onFocusInput } from 'util'

export default {
  name: 'ViewFood',
  components: { NutritionFacts },
  filters: { capitalize },

  props: ['name', 'serving', 'food', 'submitText'],
  data: () => ({ mass: null }),

  created() { this.mass = this.serving || 100 },

  computed: {
    // Shorthand for this.food.dataFood
    dataFood() { return this.food ? this.food.dataFood : null },

    // Return 0 if mass is blank
    normalizedMass() {
      if (typeof this.mass !== 'number') return 0
      return this.mass
    },

    // Use smaller font for title if text is too long
    headingClass() {
      const len = this.name.length

      // Optimized for iPhone 4 screen
      if (len <= 20) {
        return 'md-display-1'
      } else if (len > 20 && len <= 50) {
        return 'md-title'
      }
      return 'md-subheading'
    },

    unitFood: () => store.state.config.unitFood,
  },

  methods: {
    // Validate mass and emit event to parent
    onSubmit() {
      if (!this.mass) {
        this.$refs.massInput.$el.classList.add('md-input-invalid')
      } else {
        this.$emit('submit', this.mass)
      }
    },

    // Select all text on input focus
    onFocusInput,

    // Try to catch Tab key on Android
    onKeyDown(e) {
      // TODO: disable tab for desktop?
      if (e.code === 'Enter' || e.which === 9) {
        this.onSubmit()
      }
    },
  },
}
</script>

<style lang="stylus">
.food-view
  &__inputs
    display flex
    flex-direction row

    &__mass
      //

    &__eat
      top 8px
      margin-right 0 !important
      margin-left 16px !important
      height 36px
      min-width 130px !important
</style>