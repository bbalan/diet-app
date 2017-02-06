<template>
  <div id="SignupForm">

    <h1>Welcome</h1>
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->

    <p>TDEE {{ tdee }}</p>

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
import 'components/SignupForm/SignupForm.styl'
import store from 'store'
import router from 'router'
// import db from 'util/Firebase'
// import Birthday from 'components/SignupForm/Birthday'
import Gender from 'components/SignupForm/Gender'
import Height from 'components/SignupForm/Height'
import Weight from 'components/SignupForm/Weight'
import BodyFat from 'components/SignupForm/BodyFat'
import Goals from 'components/SignupForm/Goals'
import ActivityLevel from 'components/SignupForm/ActivityLevel'
import NumMeals from 'components/SignupForm/NumMeals'
// import Credentials from 'components/SignupForm/Credentials'

export default {
  name: 'SignupForm',
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
  },
  // firebase: {
  //   test: {
  //     source: db.ref('test'),
  //     asObject: true,
  //     cancelCallback() {},
  //   },
}
</script>
