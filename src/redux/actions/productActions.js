import { ActionTypes } from "../constants/actionTypes";
import Api from "../../api/Api";
// export const fetchProducts = async () => {
//   ! will not work because Actions must be plain objects. Use custom middleware for async actions. therefore use redux-thunk
//    * -> actionCreator -> action -> dispatch -> MIDDLEWARE -> reducer -> state
//   const response = await axios.get("/products");
//   return {
//     type: ActionTypes.SET_PRODUCTS,
//     payload: response,
//   };
// };

// ! Asynchronous action creator => takes some amount of time to the action object with type and payload
//    * -> actionCreator -> action -> dispatch -> MIDDLEWARE -> reducer -> state

export const fetchProducts = () => async (dispatch) => {
  // middleware function -> (dispatch,getState) --> handled by middleware (redux-thunk)
  const response = await Api.get("/products");
  dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = (id) => async (dispatch) => {
  const response = await Api.get(`/products/${id}`);
  dispatch({ type: ActionTypes.SELECTED_PRODUCTS, payload: response.data });
};

// ! Synchronous action creator => immmediately returns the action object with type and payload
// * -> actionCreator -> action -> dispatch -> reducer -> state

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCTS,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCTS,
  };
};

export const addProduct = (product) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload: product,
  };
};

export const removeProduct = (id) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: id,
  };
};
export const removeProductItem = (id) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT_ITEM,
    payload: Number(id),
  };
};
