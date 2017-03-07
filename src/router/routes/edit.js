import EditEntry from 'components/Entry/Edit/Entry'
import EditRecipe from 'components/Entry/Edit/Recipe'
import EditCustom from 'components/Entry/Edit/Custom'
import EditWorkout from 'components/Entry/Edit/Workout'

export default [
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
    component: EditRecipe,
    props: true,
    meta: {
      title: 'Add Recipe',
      backMode: 'history', // toolbar back arrow behavior
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
]
