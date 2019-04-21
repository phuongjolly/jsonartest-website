import authenticateReducer from "./authenticateReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import customerReducer from "./customerReducer";

const reducers = {
  authenticate: authenticateReducer,
  customers: customerReducer
};

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger)
);

export default store;