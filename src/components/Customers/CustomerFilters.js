import React from 'react';

export default function CustomerFilters({ showOrderDetails, fetch }) {
  console.log('showOrderDetails');
  console.log(showOrderDetails);
  return showOrderDetails && showOrderDetails.localeCompare('undefined')
    ? (
      <form className="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput">Customer Number</label>
          <input
            type="text"
            className="form-control"
            onChange={e => fetch({ customerNumber: e.target.value })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Customer Name</label>
          <input
            type="text"
            className="form-control"
            onChange={e => fetch({ customerName: e.target.value })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Contact Name</label>
          <input
            type="text"
            className="form-control"
            onChange={e => fetch({
              contactLastName: e.target.value,
            })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Phone</label>
          <input
            type="text"
            className="form-control"
            onChange={e => fetch({ phone: e.target.value })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Sale Reply</label>
          <input
            type="text"
            className="form-control"
            onChange={e => fetch({ salesRepEmployeeNumber: e.target.value })}
          />
        </div>
      </form>
    ) : (
      <tr>
        <td><input onChange={e => fetch({ customerNumber: e.target.value })} /></td>
        <td><input onChange={e => fetch({ customerName: e.target.value })} /></td>
        <td className="autoHide">
          <input onChange={e => fetch({
            contactLastName: e.target.value,
          })}
          />
        </td>
        <td className="autoHide"><input onChange={e => fetch({ phone: e.target.value })} /></td>
        <td className="autoHide"><input /></td>
        <td className="autoHide"><input onChange={e => fetch({ salesRepEmployeeNumber: e.target.value })} /></td>
      </tr>
    );
}
