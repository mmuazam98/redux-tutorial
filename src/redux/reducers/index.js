import { combineReducers } from "redux";
import { productReducer, selectedProductReducer, addProductReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  cart: addProductReducer,
});

export default reducers;
