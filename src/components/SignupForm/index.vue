<!-- This component handles the initial user signup. -->

<template>
  <div id="SignupForm">
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->
    <form @submit.prevent="onSubmit">
      <!--<test-component></test-component>-->
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
import './SignupForm.styl'

import store from '../../store'
import router from '../../router'
// import db from '../../util/Firebase'

import Birthday from './Birthday'
import Gender from './Gender'
import Height from './Height'
import Weight from './Weight'
import Goals from './Goals'
import ActivityLevel from './ActivityLevel'
// import Credentials from './Credentials'

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
