import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
  return (
    <p>页面正在读取...</p>
  );
};

const loadable = (component) => {
  return Loadable({
    loader: component,
    loading: Loading
  });
};
export default loadable;
