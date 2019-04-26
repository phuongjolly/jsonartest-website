import React, { Component } from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import {
  Redirect, Route, Router, Switch,
} from 'react-router';
import { connect } from 'react-redux';
import Login from './components/Authentication/Login';
import Customers from './components/Customers/Customers';
import { authenticateActions } from './store/authenticateReducer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const customHistory = createBrowserHistory();

class App extends Component {
  async componentWillMount() {
    this.props.loadUserFromToken();
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Router history={customHistory}>
        <div>
          {isAuthenticated ? (
            <div>
              <Header />
              <div className="wrapper">
                <div className="leftContent"><Sidebar /></div>
                <div className="rightContent">
                  <Switch>
                    <Route path="/customers/:customerNumber?" component={Customers} />
                    <Redirect to="/customers" />
                  </Switch>
                  <Footer />
                </div>
              </div>
            </div>
          ) : (
            <Switch>
              <Route component={Login} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state.authenticate,
  authenticateActions,
)(App);
