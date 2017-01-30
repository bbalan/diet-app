<template>
  <div 
    class="nutrientList__item" 
    v-if="nutrient.name != 'Water'">

    <p class="nutrientList__item__name">
      {{ nutrient.name }}
    </p>
    <p class="nutrientList__item__val">
      {{ nutrient.value * (quantity / 100) }} {{ nutrient.unit }}
    </p>
  </div>
</template>

<script>

export default {
  props: ['nutrient', 'quantity'],
}
</script>

<style scoped lang="stylus">
label[for="quantity"]
  font-weight bold

.nutrientList__item__name
  font-weight bold

.nutrientList__item__name
.nutrientList__item__val
  display inline
</style>
