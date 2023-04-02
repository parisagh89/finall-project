import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { cart, token, islogin } from "./reducer";
import thunk from "redux-thunk";
import { json } from "react-router-dom";

const reducer = combineReducers({ cart, token, islogin });
const middleware = [thunk];
const help = JSON.parse(localStorage.getItem("cart")) || [];
const gettoken = localStorage.getItem("token") || "";
const getislogin = localStorage.getItem("islogin") || false;

const initialstateCart = { cart: [...help], token: gettoken, islogin:getislogin };
const store = createStore(
  reducer,
  initialstateCart,
  applyMiddleware(...middleware)
);
export default store;
