import FoodAll from 'components/Food'
import FoodFavorites from 'components/Food/Favorites'
import FoodCustom from 'components/Food/Custom'
import FoodRecipes from 'components/Food/Recipes'

export default [{
  name: 'food',
  path: '/food',
  component: FoodAll,
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
}]
