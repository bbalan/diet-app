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
        <md-input v-model="serving" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Calories per serving</label>
        <md-input v-model="calories" type="number" required></md-input>
      </md-input-container>

      <md-input-container>
        <label>Fat</label>
        <md-input v-model="fat" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Fat (saturated)</label>
        <md-input v-model="fat_saturated" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Fat (trans)</label>
        <md-input v-model="fat_trans" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Carbs</label>
        <md-input v-model="carbs" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Sugar</label>
        <md-input v-model="sugar" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Protein</label>
        <md-input v-model="protein" type="number"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Fiber</label>
        <md-input v-model="fiber" type="number"></md-input>
      </md-input-container>

      <md-button class="entry-custom__save md-raised md-primary" @click.native="onSubmit">Save</md-button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'EntryCustom',
  data() {
    return {
      id: null,
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
  methods: {
    onSubmit() {
      console.log('sdfsdf')
    },
  },
}
</script>

<style scoped lang="stylus">
.entry-custom
  &__save
    margin 16px 0 !important
    float right

.md-input-container
  margin 8px 0
</style>