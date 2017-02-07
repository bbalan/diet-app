<template>
  <div id="Settings">

    <h1>Welcome</h1>
    <!--<h1>Data from Firebase: {{ test['.value'] }}</h1>-->

    <p>TDEE {{ tdee }}</p>
    <button @click="onPrepopulate">Prepopulate</button>

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

// import Birthday from 'components/Settings/Birthday'
import Gender from 'components/Settings/Gender'
import Height from 'components/Settings/Height'
import Weight from 'components/Settings/Weight'
import BodyFat from 'components/Settings/BodyFat'
import Goals from 'components/Settings/Goals'
import ActivityLevel from 'components/Settings/ActivityLevel'
import NumMeals from 'components/Settings/NumMeals'
// import Credentials from 'components/Settings/Credentials'

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
.btn
  &--next
    display block
    float right
</style>