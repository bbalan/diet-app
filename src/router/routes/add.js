import AddFood from 'components/Entry/Add/Food'
import AddCustom from 'components/Entry/Add/Custom'
import AddWeight from 'components/Entry/Add/Weight'

export default [
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
    name: 'addWeight',
    path: '/weight',
    component: AddWeight,
    meta: { title: 'Weight' },
  },
]
