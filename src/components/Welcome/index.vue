<template>
  <div id="welcome">

    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->

    <p>TDEE {{ tdee }}</p>

    <button @click="onPrepopulate" class="button--prepopulate mdl-button mdl-js-button mdl-js-ripple-effect">
      Prepopulate
    </button>

    <form @submit.prevent="onSubmit">
      <intro></intro>
      <gender></gender>
      <height></height>
      <weight></weight>
      <body-fat></body-fat>
      <goals></goals>
      <activity-level></activity-level>
      <!--<credentials></credentials>-->
      <num-meals></num-meals>

    </form>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
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
  name: 'Settings',
  beforeCreate() {
    if (store.state.appSettings.signupComplete) {
      // router.replace('/log')
    }
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

.button--prepopulate
  position absolute
  z-index 90001
  bottom 8px
  left 58px
</style>