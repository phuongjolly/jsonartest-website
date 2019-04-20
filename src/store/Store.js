import authenticateReducer from "./authenticateReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {logger} from "redux-logger";

const reducers = {
  authenticate: authenticateReducer
};

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, logger)
);

export default store;