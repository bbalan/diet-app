import VueRouter from 'vue-router';

import Foo from './../components/Foo/Foo';
import Bar from './../components/Foo/Bar';

// Routes
const routes = [
  {
    path: '/foo',
    component: Foo,
  },
  {
    path: '/bar',
    component: Bar,
  },
];

// Router
const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
