import Welcome from 'components/Welcome'

import Log from 'components/Log'

import EditEntry from 'components/Entry/Edit/Entry'
import AddFood from 'components/Entry/Add/Food'
import AddCustom from 'components/Entry/Add/Custom'
import AddRecipe from 'components/Entry/Add/Recipe'
import AddWeight from 'components/Entry/Add/Weight'
import EditCustom from 'components/Entry/Edit/Custom'
import EditWorkout from 'components/Entry/Edit/Workout'

import FoodAll from 'components/Food'
import FoodSearch from 'components/Food/Search'
import FoodFavorites from 'components/Food/Favorites'
import FoodCustom from 'components/Food/Custom'
import FoodRecipes from 'components/Food/Recipes'

import Workout from 'components/Workout'

import Cache from 'components/Dev/FoodCache'
import LocalStorage from 'components/Dev/LocalStorage'

export default [
  // ========== REDIRECTS
  {
    // TODO: change this
    name: 'profile',
    path: '/profile',
    redirect: { name: 'log' },
  },
  {
    // TODO: change this
    name: 'settings',
    path: '/settings',
    redirect: { name: 'welcome' },
  },
  {
    // TODO: change this
    name: 'feedback',
    path: '/settings',
    redirect: { name: 'log' },
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome,
    meta: { title: 'Welcome' },
  },
  {
    name: 'root',
    path: '',
    redirect: { name: 'log' },
  },

  // =========== MAIN PAGES
  {
    name: 'log',
    path: '/log',
    component: Log,
    meta: {
      title: 'Log',
      sidebar: true,
      search: true,
    },
  },
  {
    name: 'editEntry',
    path: '/entry/edit/:uuid',
    component: EditEntry,
    props: true,
    meta: {
      title: 'Edit Entry', // TODO: replace with food title?
      backMode: 'history', // toolbar back arrow behavior
    },
  },
  {
    name: 'addFood',
    path: '/food/add/:source/:id',
    component: AddFood,
    props: true,
    meta: {
      title: 'Add Food', // TODO: replace with food title?
      backMode: 'history', // toolbar back arrow behavior
    },
  },
  {
    name: 'addCustom',
    path: '/food/custom/add',
    component: AddCustom,
    meta: {
      title: 'Add Custom Food',
      backMode: 'history', // toolbar back arrow behavior
    },
  },
  {
    name: 'editCustom',
    path: '/food/custom/edit/:uuid',
    component: EditCustom,
    props: true,
    meta: {
      title: 'Edit Custom Food',
      backMode: 'history', // toolbar back arrow behavior
    },
  },
  {
    name: 'editRecipe',
    path: '/food/recipes/edit/:uuid',
    component: AddRecipe,
    props: true,
    meta: {
      title: 'Add Recipe',
      backMode: 'history', // toolbar back arrow behavior
    },
  },
  {
    name: 'weight',
    path: '/weight',
    component: AddWeight,
    meta: { title: 'Weight' },
  },
  {
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
  },
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
  {
    name: 'workout',
    path: '/workout',
    component: Workout,
    meta: {
      title: 'Workouts',
    },
  },
  {
    name: 'editWorkout',
    path: '/workout/edit/:uuid',
    component: EditWorkout,
    props: true,
    meta: {
      title: 'Edit workout',
      backMode: 'history', // toolbar back arrow behavior
    },
  },

  {
    name: 'devCache',
    path: '/cache',
    component: Cache,
    meta: { title: 'Cache' },
  },
  {
    name: 'devLocalStorage',
    path: '/localStorage',
    component: LocalStorage,
    meta: { title: 'localStorage' },
  },
]
