import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ProductComponent from "./ProductComponent";

import { fetchProducts, setProducts } from "../redux/actions/productActions";

const ProductListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const response = await axios.get("https://fakestoreapi.com/products").catch((err) => {
    //     console.log("Err: ", err);
    //   });
    //   dispatch(setProducts(response.data));
    // };
    // fetchProducts();
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="ui grid container">
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
