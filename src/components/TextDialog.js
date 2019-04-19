import React from 'react';
export default function TextDialog({ message, hideDialog }) {
  return (
    <div className="errorMessage">
      <div>{message}</div>
      <i className="fas fa-times" onClick={() => hideDialog()}/>
    </div>
  );
}