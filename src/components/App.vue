<template>
  <div id="app">
    <splash></splash>
    <signup-form></signup-form>
    <!--<router-link to="/foo">Go to Foo</router-link>-->
    <!--<router-link to="/bar">Go to Bar</router-link>-->
  </div>
</template>

<script>
// import Store from './../util/Store';
import store from './../util/Store';
import Splash from './Splash/Splash';
import SignupForm from './SignupForm/SignupForm';

export default {
  name: 'app',
  store,
  components: {
    Splash,
    SignupForm,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
