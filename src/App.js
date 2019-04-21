import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router";
import Customers from "./components/Customers";
import {authenticateActions} from "./store/authenticateReducer";
import {connect} from "react-redux";
import Header from "./components/Header";

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
              <Header/>
              <Switch>
                <Route path="/customers" component={Customers} />
                <Redirect to="/customers" />
              </Switch>
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
  authenticateActions
)(App);
