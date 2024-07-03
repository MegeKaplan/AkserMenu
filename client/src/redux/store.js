import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth";
import menuReducer from "./reducers/menu";

const initialState = {};

const reducers = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
