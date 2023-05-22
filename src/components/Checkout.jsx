import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import './Checkout.css';
import { addToLibrary } from '../features/firestoreLibrary';


const Checkout = () => {
 
  const dispatch = useDispatch();
  const { cartItems} = useSelector((store) => store.cart);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addToLibrary(cartItems);

    setName('');
    setEmail('');
    setAddress('');
    setPaymentMethod('');
  };


  
  return (
    <div className='container'>
    <h1>Checkout Page</h1>
    <form onSubmit={handleSubmit} className="checkout-form" >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">-- Select payment method --</option>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <button type="submit" >Submit </button>
    </form>
  </div>
  
    
    
  );
};
export default Checkout;