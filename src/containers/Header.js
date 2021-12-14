import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  return (
    <>
      <div className="ui secondary pointing menu">
        <Link to="/" className="active item">
          Home
        </Link>

        <div className="right menu">
          <Link to="/cart" className="ui item">
            <i className="cart icon"></i> <sup>{cart.length}</sup>
          </Link>
        </div>
      </div>
      {/* <div className="ui segment">
        <p></p>
      </div> */}
    </>
  );
};

export default Header;
