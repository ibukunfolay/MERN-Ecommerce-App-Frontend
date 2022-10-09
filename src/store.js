import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducers,
  productDetailsReducers,
  productCreateReducers,
  productDeleteReducers,
} from "./reducers/productReducers";
import thunk from "redux-thunk";
import cookie from "js-cookie";
import { cartReducer } from "./reducers/cartReducers";
import { userSigninReducer, userSignupReducer } from "./reducers/userReducer";

const cartItems = cookie.getJSON("cartItems") || [];
const userItems = cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems },
  userSignin: { userItems },
  userSignup: { userItems },
};
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  createProduct: productCreateReducers,
  productDelete: productDeleteReducers,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
