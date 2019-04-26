import React from 'react';
import CustomerFilters from './CustomerFilters';

function CustomersTable({
  showOrderDetails,
  data,
  history,
  fetch,
  selectedCustomer,
  filter
}) {
  console.log(showOrderDetails);
  return (
    <table className={`table ${!showOrderDetails && 'table-striped'}`}>
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Name</th>
          <th scope="col" className="autoHide">Contact Name</th>
          <th scope="col" className="autoHide">Phone</th>
          <th scope="col" className="autoHide">CreditLimit</th>
          <th scope="col" className="autoHide">SalesRep</th>
        </tr>
      </thead>
      <tbody>
        {!showOrderDetails && (
          <CustomerFilters
            filter={filter}
            fetch={f => fetch(f)}
            showOrderDetails={showOrderDetails} />
        )}
        {data && data.length > 0 && data.map(item => (
          <tr
            key={item.customerNumber}
            onClick={() => history.push(`/customers/${item.customerNumber}`)}
            className={+item.customerNumber === +selectedCustomer ? 'selected' : ''}
          >
            <td>{item.customerNumber}</td>
            <td>{item.customerName}</td>
            <td className="autoHide">
              {item.contactLastName}
              {' '}
              {item.contactFirstName}
            </td>
            <td className="autoHide">{item.phone}</td>
            <td className="autoHide">{item.creditLimit}</td>
            <td className="autoHide">{item.salesRepEmployeeNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomersTable;
