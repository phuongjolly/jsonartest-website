import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { authenticateActions } from '../store/authenticateReducer';

function Header({ currentUser, logout }) {
  return (
    <div className="header">
      <div className="brand">Sample</div>
      <div className="dropdown">
        <div
          className="dropdown-toggle profile"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="avatar">
            <img
              alt="avatar"
              src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
            />
          </span>
          <span className="profileName">
            {currentUser && currentUser.username}
          </span>
        </div>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
          <span className="dropdown-item" role="menuitem">
            <i className="fas fa-user" />
            Profile
          </span>
          <span className="dropdown-item" href="#" role="menuitem">
            <i className="fas fa-cog" />
            Setting
          </span>
          <span
            className="dropdown-item"
            role="menuitem"
            onClick={() => logout()}
          >
            <i className="fas fa-sign-out-alt" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => state.authenticate,
  authenticateActions,
)(Header);
