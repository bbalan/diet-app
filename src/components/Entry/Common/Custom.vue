<template>
  <form @submit.prevent class="common--custom">
    <!-- TODO: validation -->

    <p>Enter as much information as you can, then tap Save.</p>

    <md-input-container>
      <label>Food name</label>
      <md-input v-model="nameUser" required></md-input>
    </md-input-container>

    <md-input-container>
      <label>Serving size</label>
      <md-input v-model="servingUser" type="number" required></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Calories per serving</label>
      <md-input v-model="caloriesUser" type="number" required></md-input>
      <span class="calories__unit input__unit">kcal</span>
    </md-input-container>

    <md-input-container>
      <label>Fat</label>
      <md-input v-model="fatUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Fat (saturated)</label>
      <md-input v-model="fat_saturatedUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Fat (trans)</label>
      <md-input v-model="fat_transUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Carbs</label>
      <md-input v-model="carbsUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Fiber</label>
      <md-input v-model="fiberUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Sugar</label>
      <md-input v-model="sugarUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-input-container>
      <label>Protein</label>
      <md-input v-model="proteinUser" type="number"></md-input>
      <span class="mass__unit input__unit">{{ unitFood }}</span>
    </md-input-container>

    <md-button class="common--custom__save md-raised md-primary" @click.native="onSubmit">Save</md-button>
    <md-button class="common--custom__prepopulate md-raised" @click.native="prepopulate">Prepopulate</md-button>

  </form>
</template>

<script>
import store from 'store'

export default {
  name: 'FormCustom',
  props: ['name', 'serving', 'calories', 'fat', 'fat_saturated', 'fat_trans', 'carbs', 'fiber', 'sugar', 'protein'],
  data() {
    return {
      nameUser: null,
      servingUser: null,
      caloriesUser: null,
      fatUser: null,
      fat_saturatedUser: null,
      fat_transUser: null,
      carbsUser: null,
      fiberUser: null,
      sugarUser: null,
      proteinUser: null,
    }
  },
  created() {
    this.nameUser = this.name
    this.servingUser = this.serving
    this.caloriesUser = this.calories
    this.fatUser = this.fat
    this.fat_saturatedUser = this.fat_saturated
    this.fat_transUser = this.fat_trans
    this.carbsUser = this.carbs
    this.fiberUser = this.fiber
    this.sugarUser = this.sugar
    this.proteinUser = this.protein
  },
  computed: {
    unitFood: () => store.state.config.unitFood,
  },
  methods: {
    onSubmit() {
      this.$emit('submit', {
        name: this.nameUser,
        serving: this.servingUser || 0,
        calories: this.caloriesUser || 0,
        fat: this.fatUser || 0,
        fat_saturated: this.fat_saturatedUser || 0,
        fat_trans: this.fat_transuser || 0,
        carbs: this.carbsUser || 0,
        sugar: this.sugarUser || 0,
        protein: this.proteinUser || 0,
        fiber: this.fiberUser || 0,
      })
    },

    prepopulate() {
      this.nameUser = 'sdfsdfds'
      this.servingUser = Math.round(Math.random() * 100)
      this.caloriesUser = Math.round(Math.random() * 100)
      this.fatUser = Math.round(Math.random() * 100)
      this.fat_saturatedUser = Math.round(Math.random() * 100)
      this.fat_transUser = Math.round(Math.random() * 100)
      this.carbsUser = Math.round(Math.random() * 100)
      this.sugarUser = Math.round(Math.random() * 100)
      this.proteinUser = Math.round(Math.random() * 100)
      this.fiberUser = Math.round(Math.random() * 100)
    },
  },
}
</script>

<style lang="stylus">
.common--custom
  &__save
    margin 16px 0 16px 16px !important
    float right

  &__prepopulate
    margin 16px 0 16px 16px !important
    float right

  .md-input-container
    margin 8px 0
</style>