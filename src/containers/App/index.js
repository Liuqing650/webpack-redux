import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import router from '../../router';
import styles from './index.less';

@withRouter
class App extends React.Component {
  renderSubRoutes = (route) => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={route.path}
      render={props => {
        return (<route.component {...props} routes={route.routes || null} />)
      }}
    />
  );
  render() {
    return (
      <div id="app">
        <div className={styles.content}>
          <Switch>{router.map(route => this.renderSubRoutes(route))}</Switch>
        </div>
      </div>
    );
  }
}
export default App;

