<template>
  <transition name="toolbar-right-menu">
    <md-menu 
      v-if="isEntry || isWorkoutPreset"
      md-size="2" 
      md-direction="bottom left"
      class="side-menu">

        <md-button md-menu-trigger class="md-icon-button menu-button">
          <md-icon>more_vert</md-icon>
        </md-button>

      <md-menu-content>
        <md-menu-item v-if="isEntry" @click.native="onEntryDelete">Delete</md-menu-item>
        <md-menu-item v-if="isWorkoutPreset" @click.native="onPresetDelete">Delete</md-menu-item>
      </md-menu-content>

  </md-menu>
  </transition>
</template>

<script>
import store from 'store'
import router from 'router'

export default {
  name: 'RightMenu',
  computed: {
    isEntry() { return this.$route.name === 'entry' },
    entryUUID() {
      if (this.isEntry) return this.$route.params.uuid
      return null
    },
    isEntryWorkout() {
      if (!this.isEntry) return false
      const entryData = store.state.entries[this.$route.params.uuid]
      if (!entryData) return false
      return entryData.type === 'workout'
    },
    isWorkoutPreset() { return this.$route.name === 'workoutPreset' },
    presetUUID() { return this.isWorkoutPreset ? this.$route.params.uuid : null },
  },
  methods: {
    onEntryDelete() {
      store.commit('entries/delete', { uuid: this.entryUUID })
      router.replace({ name: 'log' })
    },
    onPresetDelete() {
      store.commit('workoutPresets/delete', { uuid: this.presetUUID })
      router.replace({ name: 'workout' })
    },
  },
}
</script>

<style scoped lang="stylus">
.side-menu
  position absolute
  top 8px
  right 8px

.toolbar-right-menu
  &-enter-active
  &-leave-active
    transition all .4s
    
  &-enter
  &-leave-to
    opacity 0
    transform scale(.5)
    transform-origin 70% center

.md-menu-content
  min-height 48px !important
  .md-list
    padding 0
</style>