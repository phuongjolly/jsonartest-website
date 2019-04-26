import React from 'react';
import './Header.css';
import {connect} from "react-redux";
import {authenticateActions} from "../store/authenticateReducer";

function Header({ currentUser }) {
  return (
    <div className="header-container">
      <div className="brand">Sample</div>
      <div className="dropdown">
        <div
          className="dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
            <span>
            {currentUser.username}
          </span>
            <span className="avatar">
            <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
          </span>
        </div>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
          <a className="dropdown-item" href="#" role="menuitem">
            <i className="fas fa-user" />
            Profile
          </a>
          <a className="dropdown-item" href="#" role="menuitem">
            <i className="fas fa-cog" />
            Setting
          </a>
          <a className="dropdown-item" href="#" role="menuitem">
            <i className="fas fa-sign-out-alt" />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => state.authenticate,
  authenticateActions
)(Header);