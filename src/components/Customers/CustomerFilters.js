import React from 'react';

export default function CustomerFilters({ showOrderDetails, fetch, filter }) {
  console.log('showOrderDetails');
  console.log(showOrderDetails);
  return showOrderDetails && showOrderDetails.localeCompare('undefined')
    ? (
      <form className="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput">Customer Number</label>
          <input
            value={filter && filter.customerNumber}
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
            value={filter && filter.customerName}
            onChange={e => fetch({ customerName: e.target.value })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Contact Name</label>
          <input
            type="text"
            className="form-control"
            value={filter && filter.contactLastName}
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
            value={filter && filter.phone}
            onChange={e => fetch({ phone: e.target.value })}
          />
        </div>
        <div className="form-group dropdown-item" role="menuitem">
          <label htmlFor="formGroupExampleInput2">Sale Reply</label>
          <input
            type="text"
            className="form-control"
            value={filter && filter.salesRepEmployeeNumber}
            onChange={e => fetch({ salesRepEmployeeNumber: e.target.value })}
          />
        </div>
      </form>
    ) : (
      <tr>
        <td>
          <input
            value={filter && filter.customerNumber}
            onChange={e => fetch({ customerNumber: e.target.value })}
          />
        </td>
        <td>
          <input
            value={filter && filter.customerName}
            onChange={e => fetch({ customerName: e.target.value })}
          />
        </td>
        <td className="autoHide">
          <input
            value={filter && filter.contactLastName}
            onChange={e => fetch({
              contactLastName: e.target.value,
            })}
          />
        </td>
        <td className="autoHide">
          <input
            value={filter && filter.phone}
            onChange={e => fetch({ phone: e.target.value })}
          />
        </td>
        <td className="autoHide" />
        <td className="autoHide">
          <input
            value={filter && filter.salesRepEmployeeNumber}
            onChange={e => fetch({ salesRepEmployeeNumber: e.target.value })}
          />
        </td>
      </tr>
    );
}
