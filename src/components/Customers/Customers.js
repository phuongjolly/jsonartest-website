import React from 'react';
import './Customers.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Pagination from 'react-js-pagination';
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
                  <span>Filter by</span>
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-filter" />
                    </div>
                    <CustomerFilters
                      showOrderDetails={showOrderDetails}
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
              fetch={obj => loadCustomers({ ...filter, ...obj })}
            />
            <div>
              <span>{`Showing ${page * pageSize + 1} to ${(page + 1) * pageSize} of ${count}` }</span>
              <Pagination
                hideFirstLastPages
                pageRangeDisplayed={5}
                activePage={page}
                itemsCountPerPage={pageSize}
                totalItemsCount={count}
                onChange={() => loadCustomers(null, page + 1, pageSize)}
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
