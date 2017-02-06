<template>
  <div class="entryFood">
    <h1>Food Find</h1>
    <router-link to="/food/search" class="tab">Search</router-link>
    <router-link to="/food/favorites" class="tab">Favorites</router-link>
    <router-link to="/food/custom" class="tab">Custom</router-link>
    <router-link to="/food/recipes" class="tab">Recipes</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'FoodFind',
}
</script>
