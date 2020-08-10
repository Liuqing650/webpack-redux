import React, { Component } from 'react';
import { Button } from 'antd';
import history from 'helpers/history';

export default class FirstPage extends Component {
  render() {
    const onBack = () => {
      history.push('/');
    };
    return (
      <div>
        FirstPage
        <Button type="primary" onClick={onBack}>返回主页</Button>
      </div>
    );
  }
}
