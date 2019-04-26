const initState = {
  orders: [],
  isLoading: false,
  customerNumber: null,
  sortBy: null,
  order: 1,
  page: 0,
  pageSize: 10,
};

const LOAD_ORDERS = 'loadOrders';
const LOAD_ORDERS_SUCCESSFUL = 'loadOrdersSuccessful';
const LOAD_ORDERS_FAILED = 'loadOrdersFailed';
const TOGGLE_ROW = 'toggleOrderDetails';
const LOAD_ORDER_DETAILS_SUCCESSFUL = 'loadOrderDetailsSuccessful';
const LOAD_ORDER_DETAILS_FAILED = 'loadOrderDetailsFailed';

export default function ordersReducer(state = initState, action) {
  switch (action.type) {
    case LOAD_ORDERS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_ORDERS_SUCCESSFUL: {
      return {
        ...state,
        orders: action.data,
        sortBy: action.sortBy,
        order: action.order,
        page: action.page,
        pageSize: action.pageSize,
        isLoading: false,
      };
    }
    case LOAD_ORDERS_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case TOGGLE_ROW: {
      const { orderNumber } = action;

      return {
        ...state,
        orders: state.orders.map(
          order => ((order.orderNumber === orderNumber)
            ? ({
              ...order,
              show: !order.show,
            })
            : order),
        ),
      };
    }
    case LOAD_ORDER_DETAILS_SUCCESSFUL: {
      const { orderNumber } = action;
      return {
        ...state,
        orders: state.orders.map(
          order => ((order.orderNumber === orderNumber)
            ? ({
              ...order,
              subDetails: action.data,
            })
            : order),
        ),
      };
    }
    default: return state;
  }
}

export const ordersActions = {
  toggleRow(orderNumber) {
    return async (dispatch) => {
      dispatch({
        type: TOGGLE_ROW,
        orderNumber,
      });
      try {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
          const response = await fetch(`/api/v1/orders/${orderNumber}`,
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            });
          const data = await response.json();
          dispatch({
            type: LOAD_ORDER_DETAILS_SUCCESSFUL,
            data,
            orderNumber,
          });
        } else {
          dispatch({
            type: LOAD_ORDER_DETAILS_FAILED,
          });
        }
      } catch (e) {
        dispatch({
          type: LOAD_ORDER_DETAILS_FAILED,
        });
      }
    };
  },
  loadOrdersByCustomerNumber(customerNumber, page, pageSize, sortBy, order) {
    return async (dispatch) => {
      dispatch({
        type: LOAD_ORDERS,
      });

      try {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
          const response = await fetch(
            `/api/v1/orders?customerNumber=${customerNumber}`
            + `&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order ? 'asc' : 'desc'}`,
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          dispatch({
            type: LOAD_ORDERS_SUCCESSFUL,
            data,
            sortBy,
            order,
            page,
            pageSize,
          });
        } else {
          dispatch({
            type: LOAD_ORDERS_FAILED,
          });
        }
      } catch (e) {
        dispatch({
          type: LOAD_ORDERS_FAILED,
        });
      }
    };
  },
};
