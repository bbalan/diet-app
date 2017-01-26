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
      <!--<activity-level></activity-level>
      <credentials></credentials>-->
    </form>
  </div>
</template>

<script>
import './SignupForm.styl'
// import db from './../../util/Firebase'
import Birthday from './Birthday'
import Gender from './Gender'
import Height from './Height'
import Weight from './Weight'
import Goals from './Goals'
// import ActivityLevel from './ActivityLevel'
// import Credentials from './Credentials'
// import TestComponent from './../TestComponent'

export default {
  components: {
    Birthday,
    Gender,
    Height,
    Weight,
    Goals,
    // ActivityLevel,
    // Credentials,
  },
  // methods: {
  //   /** Send user info form data to Firebase. */
  //   onSubmit() {
  //     db.ref('data')
  //       .push(this.Store.userInfo)
  //   },
  // },
  // firebase: {
  //   test: {
  //     source: db.ref('test'),
  //     asObject: true,
  //     cancelCallback() {},
  //   },
  // },
}
</script>
