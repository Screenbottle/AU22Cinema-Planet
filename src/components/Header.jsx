import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
  
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { actions } from '../features/firebaseRedux';

const Header = () => {

  const amount = 0;
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {               
    signOut(auth).then(() => {
      dispatch(actions.setCurrentUser(null));
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
          <div className="tittle">
          <span>Cinema Planet</span>
          </div>
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
        {currentUser ? (
          <Link to="/purchased-movies"> 
            <span>Purchased Movies</span>
          </Link>
        ) : null }
        


    
      </div>

      
      <div className="headerRight">
        {currentUser ? (
          <Link to="/">
            <span onClick={handleLogout}>
              Sign out
            </span>
          </Link>
        ) : (
          <div>
            <Link to="/login">
              <span>Login</span>
            </Link>
            <Link to="/signup">
            </Link>
          </div>
        )
        }
         
        
        <Link to='/ShoppingCart'> 
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
