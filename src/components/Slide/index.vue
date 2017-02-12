<template>
  <div class="slide swiper-slide" data-hash="slide1">
    <div class="slide__content grid__outer">
      <slot>
        Slide content goes here.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: ['data-hash'],
}
</script>

<style scoped lang="stylus">
.grid__outer
  max-width 1160px
  margin 0 auto
  position relative

.slide
  text-align left
  position relative
  width 100%
  height 100%
  /*position absolute
  top 0
  left 0
  background white
  z-index 9000*/
  user-select none
  cursor default
  background white

  &__inputs
    text-align left
    margin 20px auto
    display block

  &__content
    box-sizing border-box
    height 100%
    width 100%
    padding 16px

  /*&__content
    margin-bottom 20px*/
  &__bottom-bar
    width 100%
    height 52px
    background #eee
    position absolute
    bottom 0
    left 0
    border-top 1px solid rgba(0,0,0,.05)
    box-shadow 0 -2px 2px 0 rgba(0,0,0,.03), 0 -3px 1px -2px rgba(0,0,0,.05), 0 -1px 5px 0 rgba(0,0,0,.03)

  .mdl-radio
    text-align left
    margin-bottom 15px

.button
  &-next
  &-before
    display block
    position absolute
    top 8px
  &-next
    right 8px
    i
      margin-right -10px
      margin-top -1px
  &-before
    padding-left 8px
    padding-right 8px
    min-width auto
    left 8px
    i
      margin-right 0
      margin-top -1px
</style>