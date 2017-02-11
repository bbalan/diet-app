<template>
  <div>
    <md-toolbar>
      <md-button 
        class="md-icon-button"
        @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Log</h2>

      <md-button class="md-icon-button">
        <md-icon>favorite</md-icon>
      </md-button>
    </md-toolbar>
    <md-sidenav :md-swipeable="true" class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
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

<style scoped>

</style>
