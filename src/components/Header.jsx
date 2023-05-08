import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
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
      </div>
      <div className="headerRight">
        <Link to="/cart">
          <img
            className="header__cartIcon"
            src="https://user-images.githubusercontent.com/113544188/236866391-56ce7702-7d4f-4b3b-8d58-f6725c68173f.png"
            alt="Cart"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
