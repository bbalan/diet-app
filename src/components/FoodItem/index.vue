<template>
  <div class="foodItem" v-if="foodData !== null">
    <h2>
      {{ foodData.name }}
    </h2>

    <!--<pre>{{ foodData.nutrients }}</pre>-->

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

    <button>EAT</button>

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
      visibleNutrients: ['208', '203', '204', '205', '291', '269'], // '606', '605' == saturated, trans fat
    }
  },
  methods: {
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