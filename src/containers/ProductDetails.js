import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProduct, selectedProduct, addProduct, fetchProduct, removeProductItem, removeProduct } from "../redux/actions/productActions";
import { Rating } from "semantic-ui-react";

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  let cart = useSelector((state) => state.cart.items);
  const { image, title, price, category, description, rating } = product;
  const dispatch = useDispatch();
  // const fetchProductDetail = async (id) => {
  //   const response = await axios.get(`https://fakestoreapi.com/products/${id}`).catch((err) => {
  //     console.log("Err: ", err);
  //   });
  //   dispatch(selectedProduct(response.data));
  // };

  useEffect(() => {
    // if (productId && productId !== "") fetchProductDetail(productId);
    if (productId && productId !== "") dispatch(fetchProduct(productId));
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const [isInCart, setIsInCart] = useState(false);
  const [idx, setIdx] = useState(-1);

  useEffect(() => {
    const index = cart.findIndex((item) => item.id === Number(productId));
    if (index > -1) {
      setIsInCart(true);
      setIdx(index);
    } else {
      setIsInCart(false);
    }
  }, [cart]);

  const addToCart = () => {
    let item = { ...product };
    item.count = 1;
    dispatch(addProduct(item));
  };
  const removeFromCart = () => {
    if (cart[idx].count > 1) dispatch(removeProductItem(productId));
    else dispatch(removeProduct(Number(productId)));
  };
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div className="ui segment center">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <Rating icon="star" rating={rating.rate} maxRating={5} />
                <span className="meta">({rating.count})</span>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0" onClick={addToCart}>
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
                <div className="ui horizontal divider"></div>

                {isInCart && (
                  <div className="ui grid stackable aligned">
                    <button onClick={removeFromCart} className="ui button">
                      -
                    </button>
                    <span className="ui button">{cart[idx]?.count}</span>
                    <button onClick={addToCart} className="ui button">
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
