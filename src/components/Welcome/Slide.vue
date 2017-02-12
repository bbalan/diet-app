<template>
  <div class="slide swiper-slide" data-hash="slide1">
    <md-whiteframe md-elevation="2" class="slide__header">
      <h2>{{ title }}</h2>
    </md-whiteframe>

    <div class="slide__content grid__outer">
      <!-- TODO: replace this with a vue <slot> -->
      <p v-if="description">{{ description }}</p>

      <div class="slide__inputs">
        <slot>
          Slide content goes here.
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: ['data-hash', 'title', 'description'],
}
</script>

<style scoped lang="stylus">
.grid__outer
  max-width 1160px
  margin 0 auto
  position relative

.slide
  overflow hidden
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
    p:first-child
        margin-top 0

  &__content
    box-sizing border-box
    padding 16px 24px

    p:first-child
      margin-top 0

  /*&__content
    margin-bottom 20px*/

  &__header
    background #2196f3
    height 36%
    position relative

h2
  box-sizing border-box
  position absolute
  bottom 0
  left 0
  margin 0
  padding 16px 24px
  font-weight normal
  width 100%
  color white
  background rgba(0,0,0,.1)
  line-height 1.3em
</style>