<template>
  <header 
    :class="{
      'mdl-layout__header': true,
      'mdl-hidden': isWelcome,
      }">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Diet App</span>
      <div class="mdl-layout-spacer"></div>
      <!--<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp">
        </div>
      </div>-->
    </div>
  </header>
</template>

<script>
import store from 'store'
import paths from 'router/paths'

export default {
  data() {
    return { paths }
  },
  computed: {
    signupComplete: () => store.state.appSettings.signupComplete,
    isLog() {
      return this.$route.path === paths.Log
    },
    isWelcome() {
      return this.$route.path === paths.Welcome
    },
  },
}
</script>

<style scoped lang="stylus">
.mdl-layout__header
  transition all 0.2s ease-out
  overflow hidden

  .mdl-layout__drawer-button
    background-color rgba(0,0,0,0)
.mdl-hidden
  opacity 0
  height 0
  padding 0
  min-height 0
</style>