<template>
  <div id="welcome">
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->
    
    <form class="welcome-form" @submit.prevent="onSubmit">
      <div class="swiper-container">

        <div class="swiper-wrapper">
          <intro data-hash="intro"></intro>
          <gender data-hash="gender"></gender>
          <height data-hash="height"></height>
          <weight data-hash="weight"></weight>
          <body-fat data-hash="body-fat"></body-fat>
          <goals data-hash="goals"></goals>
          <activity-level data-hash="activity-level"></activity-level>
          <num-meals data-hash="num-meals"></num-meals>
        </div>

        <md-bottom-bar>

          <!--<div class="swiper-scrollbar"></div>-->
          <div class="swiper-pagination"></div>

          <md-button
            @click.native="onPrepopulate"
            type="button"
            class="button--prepopulate">
            Prepopulate
          </md-button>

          <md-button
            :disabled="isBeginning"
            type="button"
            class="swiper-before button-before icon-right">
            <md-icon>navigate_before</md-icon>
          </md-button>

          <md-button 
            @click.native="swiperNext"
            type="button"
            :class="{
              'button-next': true, 
              'icon-right': true,
              'md-primary': true,
              'md-raised': true,
              hidden: !isBeginning,
            }">
            Let's go
            <md-icon>navigate_next</md-icon>
          </md-button>

          <md-button 
            type="button"
            :class="{
              'swiper-next': true, 
              'button-next': true, 
              'icon-right': true,
              hidden: isEnd || isBeginning,
            }">
            Next
            <md-icon>navigate_next</md-icon>
          </md-button>

          <md-button
            type="submit" 
            :class="{
              'button-submit': true, 
              'button-next': true, 
              'md-raised': true, 
              'md-primary': true, 
              'icon-right': true,
              'hidden': !isEnd,
            }">
            Submit
            <md-icon>navigate_next</md-icon>
          </md-button>

        </md-bottom-bar>

      </div>
    </form>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import Swiper from 'swiper'
// import db from 'util/Firebase'

import Intro from 'components/Welcome/Intro'
import Gender from 'components/Welcome/Gender'
import Height from 'components/Welcome/Height'
import Weight from 'components/Welcome/Weight'
import BodyFat from 'components/Welcome/BodyFat'
import Goals from 'components/Welcome/Goals'
import ActivityLevel from 'components/Welcome/ActivityLevel'
import NumMeals from 'components/Welcome/NumMeals'
// import Birthday from 'components/Welcome/Birthday'
// import Credentials from 'components/Welcome/Credentials'

export default {
  name: 'Welcome',
  data() {
    return {
      swiper: null,
      isBeginning: null,
      isEnd: null,
    }
  },
  beforeCreate() {
    if (store.state.appSettings.signupComplete) {
      // TODO: uncomment this
      // router.replace('/log')
    }
  },
  mounted() {
    // Docs: http://idangero.us/swiper/api
    this.swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      nextButton: '.swiper-next',
      prevButton: '.swiper-before',
      paginationType: 'progress',
      hashnav: true,
      hashnavWatchState: true,
      onInit: swiper => this.updateSwiper(swiper),
      onSlideChangeEnd: swiper => this.updateSwiper(swiper),
    })
  },
  computed: {
    tdee: () => store.state.userInfo.metrics.tdee,
  },
  components: {
    Intro, Gender, Height, Weight, BodyFat, Goals, ActivityLevel, NumMeals,
  },
  methods: {
    onSubmit() {
      store.commit('appSettings/signupComplete')
      router.push('/log')

      // Send form data to Firebase
      // db.ref('data')
      //   .push(store.state.userInfo)
    },
    onPrepopulate() {
      store.commit('userInfo/prepopulate')
      this.onSubmit()
    },
    updateSwiper(swiper) {
      this.isBeginning = swiper.isBeginning
      this.isEnd = swiper.isEnd
    },
    swiperNext() {
      console.log('swiperNext')
      this.swiper.slideNext()
    },
  },
  // firebase: {
  //   test: {
  //     source: db.ref('test'),
  //     asObject: true,
  //     cancelCallback() {},
  //   },
}
</script>

<style scoped lang="stylus">
#welcome
  &, & form
    text-align center
    width 100%
    height 100%
    position absolute
    top 0
    left 0

.md-bottom-bar
  position absolute
  bottom 0
  background #eee !important
  height 48px

.button--prepopulate
  position absolute
  z-index 90001
  bottom 0
  left 58px

.button-next
  position absolute
  right 0
  bottom 0

.button-before
  position absolute
  left 0
  bottom 0

.button-submit
  z-index 100

button.hidden
  opacity 0
  pointer-events none
</style>

<style lang="stylus">

  button
    margin 8px

  &.swiper-button-disabled
    opacity 0.3
    pointer-events none

.swiper
  &-container
    width 100%
    height 100%
    padding-bottom 48px
    position relative

  &-slide
    width 100%
    height 100%

  &-pagination
    position absolute
    width 100%
    height 4px
    bottom 100%

    &-progress
      background rgba(33, 150, 243, .38)

    &-progressbar
      background #2196f3 !important

  &-scrollbar-drag
    border-radius 0
</style>