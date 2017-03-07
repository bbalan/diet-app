import FoodSearch from 'components/Food/Search'

export default [
  {
    name: 'search',
    path: '/search/:query?',
    component: FoodSearch,
    props: true,
    meta: {
      title: 'Food',
      search: true,
    },
  },
  {
    name: 'searchRecipe',
    path: '/searchRecipe/:query?',
    component: FoodSearch,
    props: true,
    meta: {
      title: null,
      search: true,
      recipeMode: true,
    },
  },
]
