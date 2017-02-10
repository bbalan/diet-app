<template>
  <div id="settings-page">

    <h1>Welcome</h1>
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->

    <p>TDEE {{ tdee }}</p>
    <button @click="onPrepopulate" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      Prepopulate
    </button>

    <form @submit.prevent="onSubmit">
      <gender></gender>
      <height></height>
      <weight></weight>
      <body-fat></body-fat>
      <goals></goals>
      <activity-level></activity-level>
      <!--<credentials></credentials>-->
      <num-meals></num-meals>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
// import db from 'util/Firebase'

// import Birthday from 'components/Welcome/Birthday'
import Gender from 'components/Welcome/Gender'
import Height from 'components/Welcome/Height'
import Weight from 'components/Welcome/Weight'
import BodyFat from 'components/Welcome/BodyFat'
import Goals from 'components/Welcome/Goals'
import ActivityLevel from 'components/Welcome/ActivityLevel'
import NumMeals from 'components/Welcome/NumMeals'
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
    Gender, Height, Weight, BodyFat, Goals, ActivityLevel, NumMeals,
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
#settings-page
  text-align center
.btn
  &--next
    display block
    float right
</style>