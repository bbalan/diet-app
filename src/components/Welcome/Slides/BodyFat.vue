<template>
  <slide title="What's your body fat percentage?" description="You can measure this with calipers.">

    <div class="slide__inputs">
      <div 
        v-if="knowBodyFat" 
        class="bodyFatPct mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        
        <input 
          v-model="bodyFatPct" 
          class="mdl-textfield__input" 
          type="number" 
          step="1" 
          id="bodyFatPct">%
        <!--<label class="mdl-textfield__label" for="bodyFatPct">Body fat</label>-->
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>

      <button 
        type="button"
        @click="onDontKnow" 
        class="bodyFatPct__dont-know mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        I don't know
      </button>
    </div>
    
  </slide>
</template>

<script>
import store from 'store'
import Slide from 'components/Welcome/Slide'

export default {
  components: { Slide },
  data() {
    return { knowBodyFat: true }
  },
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
    },
  },
}
</script>

<style scoped lang="stylus">
.bodyFatPct
  display block
  width 50px
  text-align left

  &__dont-know
    display inline-block
    margin 20px 0
    float left

  input
    width 30px
    display inline-block
</style>