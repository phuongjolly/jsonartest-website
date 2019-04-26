const initState = {
  customers: [],
  isLoading: false,
  page: 0,
  pageSize: 10,
  count: 0,
  filter: null,
};

const LOAD_CUSTOMERS = 'loadCustomers';
const LOAD_CUSTOMERS_SUCCESSFUL = 'loadCustomerSuccessful';
const LOAD_CUSTOMER_FAILED = 'loadCustomerFailed';
const CHANGE_PAGESIZE = 'changePageSize';
const UPDATE_FILTER = 'updateFilter';

export default function customersReducer(state = initState, action) {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_CUSTOMERS_SUCCESSFUL: {
      return {
        ...state,
        isLoading: false,
        customers: action.data,
        filter: action.filter,
        page: action.page,
        pageSize: action.pageSize,
        count: action.count,
      };
    }

    case LOAD_CUSTOMER_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CHANGE_PAGESIZE: {
      return {
        ...state,
        pageSize: action.data,
      };
    }
    case UPDATE_FILTER: {
      return {
        ...state,
        filter: action.data,
      };
    }
    default: {
      return state;
    }
  }
}

export const customersActions = {
  loadCustomers(filter, page = 0, pageSize = 10) {
    return async (dispatch) => {
      dispatch({
        type: LOAD_CUSTOMERS,
      });

      try {
        // eslint-disable-next-line no-undef
        const token = sessionStorage.getItem('jwtToken');

        if (token) {
          let query = '1=1';

          if (filter && filter.customerNumber) {
            query += `&customerNumber=${filter.customerNumber}`;
          }

          if (filter && filter.customerName) {
            query += `&customerName=${filter.customerName}`;
          }

          if (filter && filter.contactLastName) {
            query += `&contactLastName=${filter.contactLastName}`;
          }

          if (filter && filter.phone) {
            query += `&phone=${filter.phone}`;
          }

          if (filter && filter.salesRepEmployeeNumber) {
            query += `&salesRepEmployeeNumber=${filter.salesRepEmployeeNumber}`;
          }

          // eslint-disable-next-line no-undef
          const response = await fetch(
            `/api/v1/customers?${query}&page=${page}&pageSize=${pageSize}`,
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            },
          );

          const data = await response.json();

          dispatch({
            type: LOAD_CUSTOMERS_SUCCESSFUL,
            data: data.rows,
            count: data.count[0]['count(*)'],
            page,
            pageSize,
            filter,
          });
        } else {
          dispatch({
            type: LOAD_CUSTOMER_FAILED,
          });
        }
      } catch (e) {
        dispatch({
          type: LOAD_CUSTOMER_FAILED,
        });
      }
    };
  },

  changePageSize(pageSize) {
    return {
      type: CHANGE_PAGESIZE,
      data: pageSize,
    };
  },

  updateFilter(filter) {
    return {
      type: UPDATE_FILTER,
      data: filter,
    };
  },
};
