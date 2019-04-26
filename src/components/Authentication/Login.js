/* eslint-disable react/prop-types */
import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import TextDialog from '../TextDialog';
import { authenticateActions } from '../../store/authenticateReducer';

function Login({
  isShowMessageError,
  hideMessageError,
  updateLoginInfo,
  loginInfo,
  login,
}) {
  return (
    <div className="login">
      <div className="formHeader">
        Login to jSonar
      </div>
      <form className="mainPanel">
        {isShowMessageError
          && (
          <TextDialog
            message="Incorrect Username or Password"
            hideDialog={() => hideMessageError()}
          />
          )}
        <div className="form-group">
          <span>Username</span>
          <input
            id="username"
            className="form-control"
            placeholder="Enter email"
            onChange={e => updateLoginInfo({ ...loginInfo, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="panelGrid panelRow">
            <span>Password</span>
            <a href="/forgot-pass" className="forgotPass">Forgot password</a>
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={e => updateLoginInfo({ ...loginInfo, password: e.target.value })}
          />
        </div>
        <button
          type="button"
          className="btn loginButton"
          onClick={() => login(loginInfo)}
        >
            Log In
        </button>
      </form>
      <form className="signUpPanel">
        <span>Not registered?</span>
        <a href="/register" className="forgotPass">Create an account</a>
      </form>
    </div>
  );
}

export default connect(
  state => state.authenticate,
  authenticateActions,
)(Login);
