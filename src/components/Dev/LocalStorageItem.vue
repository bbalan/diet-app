<template>

  <div class="localStorage">
    <h2>{{ lsKey }}</h2>

    <md-button @click.native="toggleVisible" class="md-icon-button localStorage__toggle">
      <md-icon v-if="!isVisible">keyboard_arrow_down</md-icon>
      <md-icon v-else>keyboard_arrow_up</md-icon>
    </md-button>

    <transition name="expand">
    <div v-if="isVisible">

      <md-button @click.native="clear" class="md-raised md-accent icon-left localStorage__clear">
        <md-icon>warning</md-icon>
        Clear {{ lsKey }}
      </md-button>

      <pre>{{ lsData }}</pre>

    </div>
    </transition>

  </div>

</template>

<script>
export default {
  name: 'LocalStorageItem',
  props: ['lsKey'],
  data() {
    return {
      isVisible: false,
    }
  },
  computed: {
    lsData() {
      return JSON.parse(localStorage.getItem(this.lsKey))
    },
  },
  methods: {
    clear() {
      localStorage.removeItem(this.lsKey)
      location.reload()
    },
    toggleVisible() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>

<style scoped lang="stylus">
.localStorage
  position relative

  &__clear
    margin-left 0

  &__toggle
    position absolute
    top 8px
    right 0
h2
  display inline-block
</style>