<template>
  <div>
    <h2>New Exercise</h2>

    <form @submit.prevent="onSubmit">
      <p>
        <label for="exerciseName">Name:</label>
        <input name="exerciseName" type="text" v-model="name">
      </p>

      <p>
        <label for="exerciseCalories">Calories burned:</label>
        <input name="exerciseCalories" type="text" v-model="calories">
      </p>

      <button type="submit">Log exercise</button>
    </form>
    
  </div>
</template>

<script>
import store from 'store'
import uuid from 'uuid'
// import router from 'router'
// import routes from 'router/routes'

export default {
  name: 'Exercise',
  data() {
    return {
      name: null,
      calories: null,
    }
  },
  computed: {
    today() {
      return store.state.days.today
    },
  },
  methods: {
    onSubmit() {
      const exerciseUUID = uuid.v4()

      // Add exercise to the exercise cache
      store.commit('exerciseCache/add', {
        uuid: exerciseUUID,
        exerciseData: {
          name: this.name,
          calories: this.calories,
        },
      })

      // Add an exercise entry with the cached exercise uuid
      store.commit('entries/add', {
        item: exerciseUUID,
        type: 'exercise',
        data: {
          name: this.name,
          calories: this.calories,
        },
      })

      // router.push(routes.Log)
    },
  },
}
</script>
