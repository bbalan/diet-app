import Cache from 'components/Dev/FoodCache'
import LocalStorage from 'components/Dev/LocalStorage'

export default [
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
