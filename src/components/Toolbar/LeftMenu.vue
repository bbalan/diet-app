<template>
  <div class="toolbar__left-menu">
    <transition name="toolbar__button">
      <md-button 
        v-if="isSidebarEnabled"
        class="md-icon-button toolbar__open"
        @click.native="toggleSidenav">
        <md-icon>menu</md-icon>
      </md-button>
    </transition>

    <transition name="toolbar__back">
      <md-button 
        v-if="!isSidebarEnabled"
        class="md-icon-button toolbar__open toolbar__back"
        @click.native="goBack">
        <md-icon>arrow_back</md-icon>
      </md-button>
    </transition>
  </div>
</template>

<script>
import router from 'router'

export default {
  name: 'LeftMenu',
  computed: {
    isSidebarEnabled() { return this.$route.meta.sidebar },
    isBackModeHistory() { return this.$route.meta.backMode === 'history' },
  },
  methods: {
    toggleSidenav() {
      this.$emit('evtToggleSidenav')
    },
    goBack() {
      if (this.isBackModeHistory) {
        router.go(-1)
      } else {
        router.push({ name: 'log' })
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.toolbar
  &__left-menu
    position absolute
    top 0
    left 0

  &__open
    position absolute !important
    left 8px
    top 8px

  &__button
    &-enter-active
    &-leave-active
      transition all .3s ease-out
      
    &-enter
    &-leave-to
      opacity 0
      transform rotate(180deg) scale(1, .2)

  &__back
    transform rotate(0deg)

    &-enter-active
      transition all .15s .15s ease-out
      transform rotate(0deg)
    &-leave-active
      transition all .15s 0s ease-out
      transform rotate(0deg)
      
    &-enter
    &-leave-to
      opacity 0
      transform rotate(-90deg)
</style>