import React from "react";
import './Shoppingcart.css'
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../features/cartSlice";
import { Link } from "react-router-dom";

const ShoppingCart = () => {

  const price = 12.99;
  const imageBaseUrl = "https://image.tmdb.org/t/p/w780/";
  const dispatch = useDispatch();
  const { cartItems} = useSelector((store) => store.cart);

  const total = cartItems.length*price
    


 
  if (!cartItems.length) {
    return (
      <section className="cart">
        <header>
          <h2>Your cart</h2>

          <h4 className="empty-cart"> is currently empty</h4>
        </header>
      </section>
    );
  }

  const content = cartItems.map((movie) => {
  
    return (
    <div className="cart-item">
      <img
        src={imageBaseUrl + movie.backdrop_path}
        alt={movie.original_title}
      />
      <h4>
        {movie.original_title}
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItem(movie))}
        >
          remove  
        </button>
      </h4>
    </div>);
  })


  return (
    <section className="cart">
      <header>
        <h2>Your cart</h2>
      </header>

      {content}

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={()=>{dispatch(clearCart())}}>clear cart</button>
        <Link to={'/checkout'}>
        <button className="btn checkout-btn" >Checkout </button>
        </Link>
      </footer>
  
    </section>
  );
};

export default ShoppingCart;
