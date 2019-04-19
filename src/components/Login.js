import React from "react";
import './Login.css'
import TextDialog from "./TextDialog";

class Login extends React.Component{
  state={
    showMessage: false,
    username: '',
    password: ''
  };

  login() {
    const { username, password } = this.state;
    if(username && password) {

    }
  }

  render(){
    const { showMessage } = this.state;
    return (
      <div className="login">
        {showMessage &&
        <TextDialog message="Incorrect Username or Password"
                    hideDialog={() => this.setState({ showMessage: false })}/>}
        <form className="mainPanel">
          <div className="header">
            Login to jSonar
          </div>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control"
                   placeholder="Enter email" />
          </div>
          <div className="form-group">
            <div className="panelGrid panelRow">
              <label>Password</label>
              <a className="forgotPass">Forgot password</a>
            </div>
            <input type="password" className="form-control"
                   placeholder="Password" />
          </div>
          <button type="button"
                  className="btn loginButton"
                  onClick={() => this.login()}
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

export default Login;