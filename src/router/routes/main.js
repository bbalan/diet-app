import Welcome from 'components/Welcome'
import Log from 'components/Log'
import Workout from 'components/Workout'

export default [
  {
    name: 'root',
    path: '',
    redirect: { name: 'log' },
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome,
    meta: { title: 'Welcome' },
  },
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
    name: 'workout',
    path: '/workout',
    component: Workout,
    meta: {
      title: 'Workouts',
    },
  },
]
