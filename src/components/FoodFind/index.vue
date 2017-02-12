<template>
  <div class="entryFood">
    
    <router-link to="/food/search" class="tab">Search</router-link>
    <router-link to="/food/favorites" class="tab">Favorites</router-link>
    <router-link to="/food/custom" class="tab">Custom</router-link>
    <router-link to="/food/recipes" class="tab">Recipes</router-link>
    
    <hr>

    <nav>Foods:
      <router-link to="/food/new/USDA/09503">Apples</router-link>
      <router-link to="/food/new/USDA/42131">Milk</router-link>
      <router-link to="/food/new/USDA/05064">Chicken</router-link>
    </nav>

    <hr>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'FoodFind',
}
</script>
