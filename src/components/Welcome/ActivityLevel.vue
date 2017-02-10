<template>
  <slide>

    <!--<h1>What is your activity level?</h1>-->

    <input 
      type="radio" 
      name="activityLevel" 
      id="sendentary" 
      :value="1.2" 
      v-model="activityLevel"
      required>
    <label for="activityLevel">Sendentary</label>
    <input 
      type="radio" 
      name="activityLevel" 
      id="light" 
      :value="1.4" 
      v-model="activityLevel"
      required>
    <label for="activityLevel">Light</label>
    <input 
      type="radio" 
      name="activityLevel" 
      id="sendentary" 
      :value="1.6" 
      v-model="activityLevel"
      required>
    <label for="activityLevel">Medium</label>
    <input 
      type="radio" 
      name="activityLevel" 
      id="sendentary" 
      :value="1.8" 
      v-model="activityLevel"
      required>
    <label for="activityLevel">Intense</label>

    
  </slide>
</template>

<script>
import store from 'store'
import Slide from '../Slide'

export default {
  components: { Slide },
  computed: {
    activityLevel: {
      get() {
        return store.state.appSettings.activityLevel
      },
      set(activityLevel) {
        store.commit('appSettings/setActivityLevel', activityLevel)
      },
    },
  },
}
</script>
