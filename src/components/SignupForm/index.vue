<template>
  <div id="SignupForm">

    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->

    <form @submit.prevent="onSubmit">
      <birthday></birthday>
      <gender></gender>
      <height></height>
      <weight></weight>
      <goals></goals>
      <activity-level></activity-level>
      <!--<credentials></credentials>-->

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import 'components/SignupForm/SignupForm.styl'
import store from 'store'
import router from 'router'
// import db from 'util/Firebase'
import Birthday from 'components/SignupForm/Birthday'
import Gender from 'components/SignupForm/Gender'
import Height from 'components/SignupForm/Height'
import Weight from 'components/SignupForm/Weight'
import Goals from 'components/SignupForm/Goals'
import ActivityLevel from 'components/SignupForm/ActivityLevel'
// import Credentials from 'components/SignupForm/Credentials'

export default {
  beforeCreate() {
    if (store.state.userInfo.signupComplete) {
      // TODO: replace this with daily food log
      router.replace('/log')
    }
  },
  components: {
    Birthday,
    Gender,
    Height,
    Weight,
    Goals,
    ActivityLevel,
    // Credentials,
  },
  methods: {
    /** Send user info form data to Firebase. */
    onSubmit() {
      store.commit('userInfo/signupComplete')
      router.push('/log')
      // db.ref('data')
      //   .push(this.Store.userInfo)
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
