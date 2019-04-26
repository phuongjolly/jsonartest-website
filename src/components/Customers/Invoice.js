import React from 'react';

export default function Invoice({ data }) {
  let totalAmount = 0;
  data && data.length > 0 && data.map(item => totalAmount += item.quantityOrdered * item.priceEach);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Line</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {
          data && data.length > 0 && data.map(
            item => (
              <tr key={item.productionCode}>
                <td>{item.productName}</td>
                <td>{item.productLine}</td>
                <td>{item.quantityOrdered}</td>
                <td>${item.priceEach}</td>
                <td>${item.quantityOrdered * item.quantityOrdered}</td>
              </tr>
            ),
          )
        }
          <tr>
            <td colSpan={5}>
              <div className="totalAmount">
                <table>
                  <tbody>
                    <tr>
                      <td>Sub total amount</td>
                      <td>${Math.round(totalAmount * 100) / 100}</td>
                    </tr>
                    <tr>
                      <td>Vat</td>
                      <td>0%</td>
                    </tr>
                    <tr className="sumUp">
                      <td>Total amount</td>
                      <td>${Math.round(totalAmount * 100) / 100}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
