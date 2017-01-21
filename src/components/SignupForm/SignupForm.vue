<!-- This component handles the initial user signup. -->

<template>
  <div id="SignupForm">
    <h1>{{ test['.value'] }}</h1>
    <form @submit.prevent="onSubmit">
      <signup-birthday></signup-birthday>
      <signup-gender></signup-gender>
      <signup-height></signup-height>
      <signup-weight></signup-weight>
      <signup-goals></signup-goals>
      <signup-activity-level></signup-activity-level>
      <signup-credentials></signup-credentials>
    </form>
  </div>
</template>

<script>
import './SignupForm.styl';

import db from './../../util/Firebase';

import Store from './../../util/Store';
import Slide from './../Slide/Slide';

import SignupBirthday from './SignupBirthday';
import SignupGender from './SignupGender';
import SignupWeight from './SignupWeight';
import SignupHeight from './SignupHeight';
import SignupGoals from './SignupGoals';
import SignupActivityLevel from './SignupActivityLevel';
import SignupCredentials from './SignupCredentials';

export default {
  name: 'SignupForm',
  data() {
    return {
      Store,
    };
  },
  components: {
    Slide,
    SignupBirthday,
    SignupGender,
    SignupHeight,
    SignupWeight,
    SignupGoals,
    SignupActivityLevel,
    SignupCredentials,
  },
  methods: {
    /** Send user info form data to Firebase. */
    onSubmit() {
      // console.log('Submitted');

      db
        .ref('data')
        .push(this.Store.userInfo);
    },
  },
  firebase: {
    test: {
      source: db.ref('test'),
      asObject: true,
      cancelCallback() {},
    },
  },
};
</script>
