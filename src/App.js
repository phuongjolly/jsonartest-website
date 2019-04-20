import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router";
import Customers from "./components/Customers";
import {authenticateActions} from "./store/authenticateReducer";
import {connect} from "react-redux";

const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Router history={customHistory}>
        <div>
          {isAuthenticated ? (
            <Switch>
              <Route component={Customers} />
            </Switch>
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
  authenticateActions
)(App);
