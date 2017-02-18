<template>
  <div class="progress">
    <p class="progressWarnings" :class="progressClasses">
      {{ progressWarnings }}
    </p>
    <div class="progressBar">
      <div 
        class="progressBar__indicator" 
        :style="{ width: `${percent}%` }"
        :class="progressClasses">
      </div>
      <div class="progressBar__mealStops">
        <div
          v-for="meal in (numMeals - 1 || 0)" 
          :style="{ left: progressWidth(meal) + '%' }"
          class="progressBar__mealStops__stop">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from 'store'

export default {
  props: ['percent'],
  data() {
    return { calorieTolerance: 25 }
  },
  computed: {
    numMeals: () => store.state.appSettings.numMeals,
    progressClasses() {
      const remain = this.remaining * -1
      return {
        warning: remain > 0 && remain < this.calorieTolerance,
        error: remain >= this.calorieTolerance,
      }
    },
    progressWarnings() {
      const remain = this.remaining * -1
      if (remain > 0) {
        return `${remain} kcal over limit`
      }
      return null
    },
  },
  methods: {
    progressWidth(meal) {
      return meal * 100 / this.numMeals
    },
  },
}
</script>

<style scoped lang="stylus">
.progress
  position relative

.progressBar
  position relative
  width 100%
  height 2px
  background #ddd
  overflow hidden

  &__indicator
    height 100%
    position absolute
    top 0
    left 0
    background #42b983

    &.warning
      background #f70
    &.error
      background red

  &__mealStops
    width 100%
    height 100%
    &__stop
      width 5px
      height 100%
      position absolute
      top 0
      margin-left -2px
      background white

.percentages
  float left

.progressWarnings
  position absolute
  top -50px
  right 0

  &.warning
    color #f70
  &.error
    color red
</style>
