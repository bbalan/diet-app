<template>
  <div>
    <h2>Weigh in</h2>
    <form @submit.prevent="onSubmit">
      <input type="number" step=".1" v-model="weight"> {{ unitWeight }}
      <button type="submit">Submit</button>
    </form>
    <!--<weight></weight>-->
  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import paths from 'router/paths'
import Weight from 'components/Welcome/Slides/Weight'

export default {
  name: 'WeighIn',
  components: { Weight },
  data() {
    return {
      weight: null,
    }
  },
  computed: {
    unitWeight() {
      switch (store.state.appSettings.unitWeight) {
        case 'kg': return 'kg'
        case 'lbs': return 'lbs'
        default: return ''
      }
    },
  },
  methods: {
    onSubmit() {
      store.commit('userInfo/setWeight', this.weight)
      router.push(paths.Log)
    },
  },
}
</script>

<style scoped lang="stylus">
button
  display block
</style>
