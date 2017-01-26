<!-- This component handles the initial user signup. -->

<template>
  <div id="SignupForm">
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->
    <form @submit.prevent="onSubmit">
      <!--<test-component></test-component>-->
      <birthday></birthday>
      <gender></gender>
      <height></height>
      <!--<weight></weight>
      <goals></goals>
      <activity-level></activity-level>
      <credentials></credentials>-->
    </form>
  </div>
</template>

<script>
import './SignupForm.styl';

import db from './../../util/Firebase';

import Birthday from './Birthday';
import Gender from './Gender';
import Height from './Height';
// import SignupWeight from './SignupWeight';
// import SignupGoals from './SignupGoals';
// import SignupActivityLevel from './SignupActivityLevel';
// import SignupCredentials from './SignupCredentials';
// import TestComponent from './../TestComponent';

export default {
  name: 'SignupForm',
  components: {
    Birthday,
    Gender,
    Height,
    // SignupWeight,
    // SignupGoals,
    // SignupActivityLevel,
    // SignupCredentials,
  },
  methods: {
    /** Send user info form data to Firebase. */
    onSubmit() {
      db.ref('data')
        .push(this.Store.userInfo);
    },
  },
  // firebase: {
  //   test: {
  //     source: db.ref('test'),
  //     asObject: true,
  //     cancelCallback() {},
  //   },
  // },
};
</script>
