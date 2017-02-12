<template>
  <div>
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" md-theme="light-blue" class="main-toolbar">
      <div class="md-toolbar-container">
        <md-button 
          class="md-icon-button"
          @click.native="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">Log</h2>

        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>
      </div>
    </md-whiteframe>

    <md-sidenav :md-swipeable="true" class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-list>
        <md-subheader>Navigation</md-subheader>

        <md-list-item>
          <md-icon>move_to_inbox</md-icon> <span>Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon> <span>Outbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon> <span>Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon> <span>Spam</span>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>

        <md-subheader>Contacts</md-subheader>

        <md-list-item>
          <md-avatar>
            <img src="assets/avatar-2.jpg" alt="People">
          </md-avatar>

          <span>Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar>
            <img src="assets/avatar-2.jpg" alt="People">
          </md-avatar>

          <span>Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-avatar>
            <img src="assets/avatar-2.jpg" alt="People">
          </md-avatar>

          <span>Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <!--<h1>Log</h1>-->
    <day v-for="(dataDay, date) in calendar" :dataDay="dataDay" :date="date">
    </day>
  </div>
</template>

<script>
import store from 'store'
import Day from 'components/Log/Day'

export default {
  name: 'Log',
  components: { Day },
  computed: {
    // TODO: sort calendar by date
    calendar: {
      get() {
        return store.state.calendar.data
      },
    },
    currentDay() {
      return store.state.calendar.currentDay
    },
    dateFormatted() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const parsed = new Date(Date.parse(this.currentDay))
      const formatted = `${months[parsed.getMonth()]}
       ${parsed.getDate()}`

      return formatted
    },
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle()
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle()
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close()
    },
    open() {
      // console.log('Opened: ')
    },
    close() {
      // console.log('Closed: ')
    },
  },
}
</script>

<style scoped lang="stylus">
/*.main-toolbar
  position fixed
  width 100%
  top 0*/
</style>
