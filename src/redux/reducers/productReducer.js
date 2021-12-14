import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.FETCH_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCTS:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCTS:
      return {};
    default:
      return state;
  }
};

export const addProductReducer = (state = { items: [] }, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_PRODUCT:
      let exists = state.items.filter((i) => i.id === payload.id);

      if (!exists.length) return { ...state, items: [...state.items, payload] };
      let cartUpdated = state.items.map((i) => (i.id === payload.id ? { ...i, count: ++i.count } : i));
      return { ...state, items: [...cartUpdated] };

    case ActionTypes.REMOVE_PRODUCT_ITEM:
      let index = state.items.findIndex((i) => i.id === payload);
      let updatedCart = state.items.map((i) => (i.id === payload ? { ...i, count: --i.count } : i));
      return { ...state, items: [...updatedCart] };

    case ActionTypes.REMOVE_PRODUCT:
      let cart = state.items.filter((i) => {
        return i.id !== payload;
      });
      return { ...state, items: [...cart] };
    default:
      return state;
  }
};
