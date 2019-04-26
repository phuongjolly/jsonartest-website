import React from 'react';
import './Customers.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { customersActions } from '../../store/customersReducer';
import OrderDetails from './OrderDetails';
import CustomSelection from './CustomSelection';
import CustomersTable from './CustomersTable';
import CustomerFilters from './CustomerFilters';

class Customers extends React.Component {
  componentDidMount() {
    const { loadCustomers } = this.props;
    loadCustomers();
  }

  render() {
    const {
      customers, match, history,
      page, pageSize, count,
      filter, loadCustomers,
    } = this.props;
    const { customerNumber } = match.params;
    const showOrderDetails = customerNumber;

    return (
      <div className="container">
        <div className={`customersPanel ${showOrderDetails && 'short'}`}>
          <div className="panelHeader">
            <h4>
              Customers
            </h4>
            {showOrderDetails
            && (
            <i
              className="fas fa-align-justify"
              onClick={() => history.push('/customers')}
            />
            )}
          </div>
          <div className="moreInfo">
            <div className="pageSizeSelect">
              <span>Show</span>
              <CustomSelection
                data={[10, 15, 20]}
                handleFuc={size => loadCustomers(filter, page, size)}
              />
              <span>entries</span>
            </div>
            {
              showOrderDetails && (
                <div className="filterBy">
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>Filter by</span>
                    </div>
                    <CustomerFilters
                      showOrderDetails={showOrderDetails}
                      filter={filter}
                      fetch={obj => loadCustomers({ ...filter, ...obj })}
                    />
                  </div>
                </div>
              )
            }
          </div>
          <div className="content">
            <CustomersTable
              showOrderDetails={showOrderDetails}
              data={customers}
              history={history}
              selectedCustomer={customerNumber}
              filter={filter}
              fetch={obj => loadCustomers({ ...filter, ...obj })}
            />
            <div className="tableFooter">
              <span>{`Showing ${page * pageSize + 1} to ${(page + 1) * pageSize} of ${count}` }</span>
              <Pagination
                onChange={currentPage => loadCustomers(filter, currentPage - 1, pageSize)}
                current={page + 1}
                total={count}
                showLessItems
                showTitle={false}
              />
            </div>
          </div>
        </div>
        {showOrderDetails && <OrderDetails customerNumber={customerNumber} />}
      </div>
    );
  }
}

export default withRouter(connect(
  state => state.customers,
  customersActions,
)(Customers));
