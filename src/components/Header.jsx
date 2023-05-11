import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartIcon } from "../features/Icon";

const Header = () => {

  const amount = useSelector((store) => store.cart.amount)

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://raw.githubusercontent.com/alex88g/Images/main/Images/earth3.png"
            alt="Logo"
          />
        </Link>
        <Link to="/movies/popular">
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated">
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming">
          <span>Upcoming</span>
        </Link>
        <Link to='/ShoppingCart'> 
        {/* <CartIcon></CartIcon> */}
          <span>Shopping cart {amount}</span>
        </Link>
      </div>
    </div>  
  );
};

export default Header;
