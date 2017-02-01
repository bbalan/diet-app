<template>
  <div class="foodItem" v-if="foodData !== null">
    <h2>
      {{ foodData.name }}
    </h2>

    <!--<pre>{{ foodData }}</pre>-->

    <form>
      <label for="quantity">Quantity:</label>
      <input type="number" name="quantity" v-model="quantity">
      <span class="quantity__unit">grams</span>
    </form>

    <nutrient 
      v-for="nutrientID in visibleNutrients"
      v-if="findNutrient(nutrientID)"
      :nutrient="findNutrient(nutrientID)"
      :parentMass="quantity"
      :decimals="1">
    </nutrient>

    <p class="dataSource">Source: USDA</p>

    <button @click="onEat">Eat</button>

  </div>
</template>

<script>
import Nutrient from './Nutrient'

export default {
  props: ['foodData'],
  components: { Nutrient },
  data() {
    return {
      // TODO: offer more units of quantity (oz, cups, etc)
      quantity: 100,
      visibleNutrients: [
        '208',
        '204',
        '205',
        '291',
        '203',
        '269',
        '307',
      ],
      // '606', '605' == saturated, trans fat
    }
  },
  methods: {
    onEat() {
      console.log('Ate', this.foodData.name)
    },
    // Get nutrient by USDA nutrient ID
    findNutrient(id) {
      function nutrientFilter(item) {
        return item.nutrient_id === id
      }

      return this.foodData.nutrients.filter(nutrientFilter)[0]
    },
  },
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
