import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import { useDispatch } from "react-redux";
import { actions } from '../features/firebaseRedux';


const Header = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {               
    signOut(auth).then(() => {
      dispatch(actions.setCurrentUser(null));
      // Sign-out successful.

      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }



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
        <Link to="/login">
          <span>Login</span>
        </Link>
        <Link to="/signup">
          <span>signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
