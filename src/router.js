import loadable from 'helpers/loadable';
import HomePage from './containers/HomePage';
// 按需加载

const FirstPage = loadable(() => import('./containers/FirstPage' /* webpackChunkName: 'FirstPage' */));

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/page',
    component: FirstPage
  },
];
