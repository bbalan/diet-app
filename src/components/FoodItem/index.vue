<template>
  <div class="foodItem" v-if="foodReport !== null">
    <!--<h2>
      {{ foodReport.name }}
    </h2>-->

    <!--<pre>{{ foodReport }}</pre>-->

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

    <p class="dataSource">Source: {{ foodReport.source }}</p>

    <button @click="onEat">Eat</button>

  </div>
</template>

<script>
import Nutrient from './Nutrient'

export default {
  props: ['foodReport'],
  components: { Nutrient },
  data() {
    return {
      // TODO: offer more units of quantity (oz, cups, etc)
      quantity: 100,
    }
  },
  computed: {
    visibleNutrients() {
      switch (this.foodReport.source) {
        case 'USDA':
          return [
            '208',
            '204',
            '205',
            '291',
            '203',
            '269',
            '307',
            // '606', '605' == saturated, trans fat
          ]
        default: return []
      }
    },
  },
  methods: {
    onEat() {
      console.log('Ate', this.foodReport.name)
    },
    // Get nutrient by USDA nutrient ID
    findNutrient(id) {
      let nutrientFilter

      if (this.foodReport.source === 'USDA') {
        nutrientFilter = item => (item.nutrient_id === id)
      }

      return this.foodReport.nutrients.filter(nutrientFilter)[0]
    },
  },
}
</script>

<style scoped lang="stylus">
button
  font-size 20px  
  width 200px
</style>
