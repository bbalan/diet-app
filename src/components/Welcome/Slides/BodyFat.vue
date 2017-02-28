<template>
  <slide title="What's your body fat percentage?" class="slide--bodyfat">

    <div slot="description">
      <p>You can measure your body fat with calipers. It's ok if you're not sure!</p>
    </div>

    <md-input-container class="bodyFatPct" ref="bodyFatInput">
      <label for="bodyFatPct__input">Body fat</label>
      <md-input name="bodyFatPct__input" v-model="bodyFatPct" type="number" @focus.native="onFocusInput('bodyFatInput')"></md-input>
      <span class="bodyFatPct__percent">%</span>
    </md-input-container>
    
    <md-button 
      @click.native="onDontKnow" 
      class="md-raised md-primary icon-right bodyFatPct__dont-know">
      I'm not sure
      <md-icon>navigate_next</md-icon>
    </md-button>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'
import { onFocusInput } from 'util'

export default {
  components: { Slide },
  computed: {
    bodyFatPct: {
      get() {
        return store.state.userInfo.metrics.bodyFatPct
      },
      set(bodyFatPct) {
        store.commit('userInfo/setBodyFatPct', bodyFatPct)
      },
    },
  },
  methods: {
    onDontKnow() {
      this.bodyFatPct = null
      this.$emit('evtDontKnow')
    },
    onFocusInput,
  },
}
</script>

<style scoped lang="stylus">
.bodyFatPct
  display inline-block !important
  max-width 40% !important
  label
    width 200px
    pointer-events none !important
  position relative
  width 124px
  &__percent
    opacity 0
    transition opacity .2s
    position absolute
    right -10px
    bottom 7px
    pointer-events none
  &.md-input-focused
  &.md-has-value
    .bodyFatPct__percent
      opacity 1
.bodyFatPct__dont-know
  margin 16px 0 16px 16px
  display inline-block !important
  /*max-width 40%*/
  min-width 142px
</style>