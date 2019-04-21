const initState = {
  customers: [],
  isLoading: false,
  page: 0,
  pageSize: 10
};

const LOAD_CUSTOMERS = 'loadCustomers';
const LOAD_CUSTOMERS_SUCCESSFUL = 'loadCustomerSuccessful';
const LOAD_CUSTOMER_FAILED = 'loadCustomerFailed';

export default function customerReducer(state = initState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOAD_CUSTOMERS_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        customers: action.data
      };
    }
    case LOAD_CUSTOMER_FAILED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default: return state;
  }
}

export const customersActions = {
  loadCustomers(filter, page = 0, pageSize = 10){
    return async (dispatch) => {
      dispatch({
        type: LOAD_CUSTOMERS
      });
      try {
        const token = sessionStorage.getItem('jwtToken');
        if(token) {
          let query = '1=1';
          if(filter && filter.customerNumber) {
            query += `&customerNumber=${filter.customerNumber}`;
          }
          if(filter && filter.customerName) {
            query += `&customerName=${filter.customerName}`;
          }
          if(filter && filter.salesRepEmployeeNumber) {
            query += `&salesRepEmployeeNumber=${filter.salesRepEmployeeNumber}`;
          }

          const response = await fetch(
            `/api/v1/customers?${query}&page=${page}&pageSize=${pageSize}`,
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            });
          const data = await response.json();
          dispatch({
            type: LOAD_CUSTOMERS_SUCCESSFUL,
            data
          });
        } else {
          dispatch({
            type: LOAD_CUSTOMER_FAILED
          });
        }

      } catch (e) {
        dispatch({
          type: LOAD_CUSTOMER_FAILED
        });
      }
    }
  }
};