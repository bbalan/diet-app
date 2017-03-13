<template>
  <div class="max-width page--padded page--menu">
    <iddb-entries></iddb-entries>
    <iddb-friends></iddb-friends>
  </div>
</template>

<script>
import IddbFriends from 'components/Dev/iddbFriends'
import IddbEntries from 'components/Dev/iddbEntries'

export default {
  name: 'IndexedDB',
  components: { IddbFriends, IddbEntries },
}
</script>

<style lang="stylus">
.iddb-item
  position relative

  &__clear
    margin-left 0

  &__toggle
    position absolute !important
    top 8px
    right 0

  h2
    display inline-block
</style>