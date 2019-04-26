import authenticateReducer from './authenticateReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import customersReducer from './customersReducer';
import ordersReducer from './ordersReducer';

const reducers = {
  authenticate: authenticateReducer,
  customers: customersReducer,
  orders: ordersReducer
};

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger)
);

export default store;