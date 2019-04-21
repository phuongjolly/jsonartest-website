import React from "react";
import './Customers.css';
import {connect} from "react-redux";
import {customersActions} from "../store/customerReducer";

class Customers extends React.Component{
  componentDidMount() {
    this.props.loadCustomers();
  }

  render(){
    const { customers } = this.props;
    console.log(customers);
    return (
      <div className="wrapper">
        <div className="container">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Contact Name</th>
              <th scope="col">Phone</th>
              <th scope="col">CreditLimit</th>
              <th scope="col">SalesRep</th>
            </tr>
            </thead>
            <tbody>
            {customers && customers.length > 0 && customers.map(item =>
              <tr key={item.customerNumber}>
                <th scope="row">{item.customerNumber}</th>
                <td>{item.customerName}</td>
                <td>{item.contactLastName} {item.contactFirstName}</td>
                <td>{item.phone}</td>
                <td>{item.creditLimit}</td>
                <td>{item.salesRepEmployeeNumber}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>);
  }
}

export default connect(
  state => state.customers,
  customersActions
)(Customers);