import React from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import { authenticateActions } from '../store/authenticateReducer';

function Sidebar({ currentUser }) {
  return (
    <div className="sidebar">
      <div className="profile">
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
    </div>
  );
}

export default connect(
  state => state.authenticate,
  authenticateActions,
)(Sidebar);
