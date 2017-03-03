
import FoodFind from 'components/FoodFind'
import FoodFavorites from 'components/FoodFind/Favorites'
import FoodCustom from 'components/FoodFind/Custom'
import FoodRecipes from 'components/FoodFind/Recipes'

export default {
  name: 'food',
  path: '/food',
  component: FoodFind,
  redirect: { name: 'foodFavorites' },
  meta: {
    title: 'Food',
    sidebar: true,
    search: true,
    backMode: 'history', // toolbar back arrow behavior
  },
  children: [
    {
      name: 'foodFavorites',
      path: 'favorites',
      component: FoodFavorites,
      meta: {
        title: 'Food',
        search: true,
      },
    },
    {
      name: 'foodCustom',
      path: 'custom',
      component: FoodCustom,
      meta: {
        title: 'Food',
        search: true,
      },
    },
    {
      name: 'foodRecipes',
      path: 'recipes',
      component: FoodRecipes,
      meta: {
        title: 'Food',
        search: true,
      },
    },
  ],
}
