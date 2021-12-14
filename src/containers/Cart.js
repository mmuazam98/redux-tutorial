import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { removeProduct } from "../redux/actions/productActions";

const Content = styled.div`
  position: relative;
  top: 20px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const remove = (id) => {
    dispatch(removeProduct(id));
  };
  const Item = ({ item }) => {
    return (
      <div className="item">
        <div className="image" onClick={() => navigate(`/product/${item.id}`)}>
          <img src={item.image} />
        </div>
        <Content className="content">
          <Link to={`/product/${item.id}`} className="header">
            {item.title}
          </Link>
          <div className="meta">
            <span>{item.category}</span>
          </div>
          <div className="extra">{item.description}</div>
          <div className="description">
            <p>Qty: {item.count}</p>
          </div>
          <div className="ui right floated red button" onClick={() => remove(item.id)}>
            Remove
            <i className="right trash icon"></i>
          </div>
          <h2>
            <a className="ui teal tag label">${item.price}</a>
          </h2>
        </Content>
      </div>
    );
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    cart.forEach((i) => {
      sum += i.price * i.count;
    });
    setTotal(sum);
  }, [cart]);
  return (
    <div className="ui grid container">
      <div className="ui items">
        {cart.map((item) => (
          <Item item={item} key={item.id} />
        ))}
        <div className="ui items">
          <div className="ui divider"></div>
          <div className="ui right floated">Total: ${total}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
