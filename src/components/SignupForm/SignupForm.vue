<!-- This component handles the initial user signup. -->

<template>
  <div id="SignupForm">
    <form @submit.prevent="onSubmit">
      <signup-birthday></signup-birthday>
      <signup-gender></signup-gender>
      <signup-height></signup-height>
      <signup-weight></signup-weight>
      <signup-goals></signup-goals>
      <signup-activity-level></signup-activity-level>
    </form>
  </div>
</template>

<script>
import './SignupForm.styl';

import Store from './../../util/Store';
import Slide from './../Slide/Slide';

import SignupBirthday from './SignupBirthday';
import SignupGender from './SignupGender';
import SignupWeight from './SignupWeight';
import SignupHeight from './SignupHeight';
import SignupGoals from './SignupGoals';
import SignupActivityLevel from './SignupActivityLevel';

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
  },
  methods: {
    onSubmit() {
      console.log('Submitted');
    },
  },
};
</script>
