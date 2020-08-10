import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

class Home extends Component {
  componentDidMount() {
    this.onRequest();
  }
  action = type => {
    this.props.dispatch({type})
  }
  onRequest = () => {
    this.action('loadingData');
  }
  onPage = () => {
    this.props.history.push('/page');
  };
  onRequestTest = () => {
    this.action('loadingData');
  };
  render() {
    const { msg } = this.props.home;
    console.log(this.props);
    return (
      <div>
        <div>HomePage</div>
        <div>msg: {msg}</div>
        <Button type="primary" onClick={this.onRequest}>发起请求</Button>
        <Button type="primary" onClick={this.onPage}>进入page</Button>
        <br />
        <Button onClick={this.onRequestTest}>测试请求</Button>
      </div>
    );
  }
}
export default connect(state => state)(Home);
