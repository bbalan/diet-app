<template>
  <div class="slide">
    <div class="slide__content">
      <slot>
        Slide content goes here.
      </slot>
    </div>

    <button 
      v-if="!last" 
      type="button"
      class="button-next mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      Next
      <i class="material-icons">navigate_next</i>
    </button>

    <button 
      v-else
      type="submit" 
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    last: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus">
.slide
  width 100%
  height 100%
  position relative
  /*position absolute
  top 0
  left 0
  background white
  z-index 9000*/

  /*&__content
    margin-bottom 20px*/
.button-next
  display block
  margin 0 auto
  i
    margin-right -10px
</style>