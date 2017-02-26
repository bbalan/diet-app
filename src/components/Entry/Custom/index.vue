<template>
  <div class="entry-custom page page--padded page--menu"> 

    <p>Enter as much information as you can, then tap Save.</p>

    <form @submit.prevent="onSubmit">
      <md-input-container>
        <label>Food name</label>
        <md-input v-model="name" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Serving size</label>
        <md-input v-model="serving" type="number" required></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Calories per serving</label>
        <md-input v-model="calories" type="number" required></md-input>
        <span class="calories__unit input__unit">kcal</span>
      </md-input-container>

      <md-input-container>
        <label>Fat</label>
        <md-input v-model="fat" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Fat (saturated)</label>
        <md-input v-model="fat_saturated" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Fat (trans)</label>
        <md-input v-model="fat_trans" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Carbs</label>
        <md-input v-model="carbs" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Sugar</label>
        <md-input v-model="sugar" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Protein</label>
        <md-input v-model="protein" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-input-container>
        <label>Fiber</label>
        <md-input v-model="fiber" type="number"></md-input>
        <span class="mass__unit input__unit">{{ unitFood }}</span>
      </md-input-container>

      <md-button class="entry-custom__save md-raised md-primary" @click.native="onSubmit">Save</md-button>

      <md-button class="entry-custom__prepopulate md-raised" @click.native="prepopulate">Prepopulate</md-button>
    </form>

  </div>
</template>

<script>
import store from 'store'
import router from 'router'
import uuid from 'uuid'

export default {
  name: 'EntryCustom',
  data() {
    return {
      name: null,
      serving: null,
      calories: null,
      fat: null,
      fat_saturated: null,
      fat_trans: null,
      carbs: null,
      sugar: null,
      protein: null,
      fiber: null,
    }
  },
  computed: {
    unitFood: () => store.state.appSettings.unitFood,
  },
  methods: {
    onSubmit() {
      this.cacheUUID = uuid.v4()
      store.commit('foodCache/add', {
        uuid: this.cacheUUID,
        id: 'custom',
        timesLogged: 0,
        source: 'custom',
        dataFood: {
          name: this.name,
          serving: this.serving,
          calories: this.calories,
          fat: this.fat,
          fat_saturated: this.fat_saturated,
          fat_trans: this.fat_trans,
          carbs: this.carbs,
          sugar: this.sugar,
          protein: this.protein,
          fiber: this.fiber,
        },
      })

      router.go(-1)
    },
    prepopulate() {
      this.name = 'sdfsdfds'
      this.serving = Math.round(Math.random() * 100)
      this.calories = Math.round(Math.random() * 100)
      this.fat = Math.round(Math.random() * 100)
      this.fat_saturated = Math.round(Math.random() * 100)
      this.fat_trans = Math.round(Math.random() * 100)
      this.carbs = Math.round(Math.random() * 100)
      this.sugar = Math.round(Math.random() * 100)
      this.protein = Math.round(Math.random() * 100)
      this.fiber = Math.round(Math.random() * 100)
    },
  },
}
</script>

<style scoped lang="stylus">
.entry-custom
  &__save
    margin 16px 0 !important
    float right

  &__prepopulate
    margin 16px
    float right

.md-input-container
  margin 8px 0
</style>