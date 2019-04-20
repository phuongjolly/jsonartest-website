import React from "react";
import './Login.css'
import TextDialog from "./TextDialog";
import {connect} from "react-redux";
import {authenticateActions} from "../store/authenticateReducer";

class Login extends React.Component{
  render(){
    const { isShowMessageError, hideMessageError,
      updateLoginInfo, loginInfo, login
    } = this.props;
    return (
      <div className="login">
        <form className="mainPanel">
          <div className="header">
            Login to jSonar
          </div>
          {isShowMessageError &&
          <TextDialog message="Incorrect Username or Password"
                      hideDialog={() => hideMessageError()}/>}
          <div className="form-group">
            <label>Username</label>
            <input className="form-control"
                   placeholder="Enter email"
                   onChange={e => updateLoginInfo({...loginInfo, username: e.target.value})}
            />
          </div>
          <div className="form-group">
            <div className="panelGrid panelRow">
              <label>Password</label>
              <a className="forgotPass">Forgot password</a>
            </div>
            <input type="password"
                   className="form-control"
                   placeholder="Password"
                   onChange={e => updateLoginInfo({...loginInfo, password: e.target.value})} />
          </div>
          <button type="button"
                  className="btn loginButton"
                  onClick={() => login(loginInfo)}
          >
            Log In
          </button>
        </form>
        <form className="signUpPanel">
          <label>Not registered?</label>
          <a className="forgotPass">Create an account</a>
        </form>
      </div>
    );
  }
}

export default connect(
  state => state.authenticate,
  authenticateActions
)(Login);