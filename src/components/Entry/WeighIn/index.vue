<template>
  <div>
    <h2>Weigh in</h2>
    <!--<input type="number" step=".1"> {{ }}-->
    <weight></weight>
  </div>
</template>

<script>
import Weight from 'components/Settings/Weight'

export default {
  name: 'WeighIn',
  components: { Weight },
  // data() {
  //   return {
  //     weight: null,
  //   }
  // },
  // computed: {
  //   mass() {
  //     return store.state.userInfo.mass
  //   }
  // },
  // methods: {
  //   onSubmit() {
  //     // Do nothing
  //   },
  // },
}
</script>
