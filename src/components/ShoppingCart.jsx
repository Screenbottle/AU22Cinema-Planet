import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { clearCart } from "../features/cartSlice";


const ShoppingCart = () => {
    const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your cart</h2>

          <h4 className="empty-cart">Your cart is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>Your cart</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr/>
        <div className="cart-total">
        <h4>
         total <span>${total}</span>
        </h4>
        </div>
        <button className="btn clear-cart" onClick={()=>dispatch(clearCart())}>Clear cart</button>
      </footer>
    </section>
  );
};

export default ShoppingCart;
