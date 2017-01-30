<template>
  <div class="foodItem" v-if="visible && foodData !== null">
    <h2>{{ foodData.name }}</h2>
    <button @click="onClose">Cancel</button>

    <!--<pre>{{ foodData }}</pre>-->

    <form>
      <label for="quantity">Quantity:</label>
      <input type="number" name="quantity" v-model="quantity">
      <span class="quantity__unit">grams</span>
    </form>

    <nutrient 
      v-for="nutrient in foodData.nutrients"
      :nutrient="nutrient"
      :quantity="quantity">
    </nutrient>

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
      visible: false,
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
  },
  watch: {
    foodData() {
      this.visible = true
    },
  },
}
</script>