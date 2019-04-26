import React from 'react';
import './OrderDetails.css';
import { connect } from 'react-redux';
import { ordersActions } from '../../store/ordersReducer';
import Invoice from './Invoice';

class OrderDetails extends React.Component {
  componentDidMount() {
    const { customerNumber, loadOrdersByCustomerNumber } = this.props;

    loadOrdersByCustomerNumber(customerNumber, 0, 10);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { customerNumber } = nextProps;
    const oldCustomerNumber = props.customerNumber;

    if (customerNumber !== oldCustomerNumber) {
      props.loadOrdersByCustomerNumber(customerNumber, 0, 10);
    }
  }

  sortBy(field) {
    const {
      loadOrdersByCustomerNumber, page,
      pageSize, order, customerNumber,
    } = this.props;
    loadOrdersByCustomerNumber(
      customerNumber, page, pageSize, field, !order,
    );
  }

  static getStatusColor(status) {
    if (!status.localeCompare('Shipped')) {
      return 'btn-success';
    } if (!status.localeCompare('Disputed')) {
      return 'btn-secondary';
    } if (!status.localeCompare('Cancelled')) {
      return 'btn-danger';
    }
    return 'btn-warning';
  }

  render() {
    const {
      orders, toggleRow,
    } = this.props;
    return (
      <div className="orderDetails table-responsive-md">
        <div className="panelHeader">
          <h4>
            Order Details
          </h4>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th
                scope="col"
                onClick={() => this.sortBy('orderNumber')}
              >
                Number
                {' '}
                <i className="fas fa-exchange-alt" />
              </th>
              <th
                scope="col"
                onClick={() => this.sortBy('orderDate')}
              >
                Order Date
                <i className="fas fa-exchange-alt" />
              </th>
              <th
                scope="col"
                onClick={() => this.sortBy('requiredDate')}
              >
                Required Date
                <i className="fas fa-exchange-alt" />
              </th>
              <th
                scope="col"
                onClick={() => this.sortBy('shippedDate')}
              >
                Shipped Date
                <i className="fas fa-exchange-alt" />
              </th>
              <th
                scope="col"
                onClick={() => this.sortBy('status')}
              >
                Status
                <i className="fas fa-exchange-alt" />
              </th>
              <th scope="col">
                Comment
                <i className="fas fa-exchange-alt" />
              </th>
            </tr>
          </thead>
          <tbody>
            {
            orders && orders.length > 0 && orders.map(item => ([
              <tr onClick={() => toggleRow(item.orderNumber)} key={item.orderNumber}>
                <td className={item.show ? 'selected' : ''}>
                  <i className="fas fa-sort-down" />
                </td>
                <td>{item.orderNumber}</td>
                <td>{item.orderDate && item.orderDate.slice(0, 10)}</td>
                <td>{item.requiredDate && item.requiredDate.slice(0, 10)}</td>
                <td>{item.shippedDate && item.shippedDate.slice(0, 10)}</td>
                <td>
                  <button
                    type="button"
                    className={`btn ${OrderDetails.getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="comments">{item.comments}</td>
              </tr>,
              item.show && (
                <tr className="invoice">
                  <td colSpan={7}>
                    <Invoice data={item.subDetails} />
                  </td>
                </tr>
              ),
            ]))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({ ...state.orders, ...props }),
  ordersActions,
)(OrderDetails);
