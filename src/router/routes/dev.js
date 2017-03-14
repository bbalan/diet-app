import Cache from 'components/Dev/FoodCache'
import LocalStorage from 'components/Dev/LocalStorage'
import IndexedDB from 'components/Dev/IndexedDB'

export default [
  {
    name: 'devCache',
    path: '/cache',
    component: Cache,
    meta: { title: 'Cache' },
  },
  {
    name: 'devIndexedDB',
    path: '/indexeddb',
    component: IndexedDB,
    meta: { title: 'IndexedDB' },
  },
  {
    name: 'devLocalStorage',
    path: '/localStorage',
    component: LocalStorage,
    meta: { title: 'localStorage' },
  },
]
