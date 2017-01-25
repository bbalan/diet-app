<template>
  <div id="TestComponent">
    <p>{{testVal}}</p>
    <button @click="testMethod">Test</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from './../util/Store';

export default {
  name: 'TestComponent',
  data() {
    return {
      // ...
    };
  },
  methods: {
    testMethod() {
      store.commit('moduleTest/testMutation');
    },
  },
  computed: {
    ...mapState('moduleTest', [
      'testVal',
    ]),
  },
};
</script>

<style scoped>

</style>