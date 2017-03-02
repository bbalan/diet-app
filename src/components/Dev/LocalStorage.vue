<template>
  <div class="page--padded page page--menu">
    <local-storage-item lsKey="recipe"></local-storage-item>
    <local-storage-item lsKey="userInfo"></local-storage-item>
    <local-storage-item lsKey="foodCache"></local-storage-item>
    <local-storage-item lsKey="config"></local-storage-item>
    <local-storage-item lsKey="calendar"></local-storage-item>
    <local-storage-item lsKey="entries"></local-storage-item>
    <local-storage-item lsKey="workoutPresets"></local-storage-item>

    <md-button @click.native="localStorageClear" class="md-raised md-accent localStorage__clear--all icon-left">
      <md-icon>warning</md-icon>
      localStorage.clear()
    </md-button>
  </div>
</template>

<script>
import store from 'store'
import LocalStorageItem from 'components/Dev/LocalStorageItem'

export default {
  name: 'LocalStorage',
  components: { LocalStorageItem },
  computed: {
    search() { return store.state.search },
  },
  methods: {
    localStorageClear() {
      localStorage.clear()
      location.reload()
    },
  },
}
</script>

<style scoped lang="stylus">
.localStorage__clear--all
  display inline-block
  margin-left 0
</style>