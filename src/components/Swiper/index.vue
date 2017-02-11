<template>
  <div id="welcome">
    <md-bottom-bar>
      <div class="grid__outer">
        <md-button
          type="button"
          class="button-before md-dense icon-right">
          <md-icon>navigate_before</md-icon>
        </md-button>

        <md-button 
          type="button"
          class="button-next md-dense icon-right">
          Next
          <md-icon>navigate_next</md-icon>
        </md-button>

        <!--<md-button 
          type="submit" 
          class="button-next md-dense icon-right">
          Submit
          <md-icon>navigate_next</md-icon>
        </md-button>-->
      </div>
    </div>
    </md-bottom-bar>
  </div>
</template>

<script>
import 'swiper'

export default {
  data() {
    return {
      // ...
    }
  },
  components: {
    // ...
  },
}
</script>

<style scoped lang="stylus">
#welcome
  width 100%
  height 100%
  position relative

.md-bottom-bar
  position absolute
  bottom 0
  background #eee !important
  height 48px

  button
    margin 8px

.button-next
  position absolute
  right 0
  bottom 0

.button-before
  position absolute
  left 0
  bottom 0
</style>