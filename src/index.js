import React from 'react';
import axios from 'axios';
import Uuid from 'uuid';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { ConfigProvider } from 'antd';
import { Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import browserHistory from './helpers/history';
import stores from './stores';
import App from './containers/App';

// 请求之前传递携带 token
axios.interceptors.request.use(
  axiosConfig => {
    axiosConfig.headers['auth-token'] = `mobx-${Uuid.v4()}`;
    axiosConfig.headers['Cache-Control'] = 'no-cache';
    if (!axiosConfig.params) {
      axiosConfig.params = {
        timestamp: new Date().getTime()
      };
    } else {
      axiosConfig.params.timestamp = new Date().getTime();
    }
    return axiosConfig;
  },
  error => {
    console.log('request error', error);
  }
);

axios.interceptors.response.use((response) => response, (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  if (error && error.response.data.errorCode === 401000) {
    window.location.href = '/';
  }
  return Promise.reject(error);
});

const renderApp = () => {
  Loadable.preloadReady().then(() => {
    ReactDom.render(
      <Provider store={stores}>
        <Router history={browserHistory}>
          <ConfigProvider locale={zhCN}>
            <App />
          </ConfigProvider>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });
};
renderApp();
