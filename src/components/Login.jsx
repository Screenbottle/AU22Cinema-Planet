import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../features/firebaseRedux';

import './Login.css'; // import your custom CSS file
import { getCart as getCartFS} from '../features/firestoreCart';
import { addToCart } from '../features/cartSlice';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorElement, setErrorElement] = useState(null);
  const dispatch = useDispatch();

  const getCart = async () => {
    const cart = await getCartFS();
    if (cart.length) {
      cart.forEach(item => {
        dispatch(addToCart(item));
      });
    }
  }

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(actions.setCurrentUser(user.uid));
        getCart();
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        createErrorElement(errorCode, errorMessage);
      });
  };

  const createErrorElement = (errorCode, errorMessage) => {
    setErrorElement(
      <div>
        <h5>Something went wrong: {errorCode} {errorMessage}</h5>
      </div>
    );
  };

  return (
    <div>
      <section className="login-container">
        <div className="login-section">
        <div className="login-form-container">
          <p className="login-text">Login to your account!</p>
          <form>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <br />

            {errorElement}

            <br />

            <div>
              <button 
              className="login-form-button"
              onClick={onLogin}>Login</button>
            </div>
          </form>

          <p className="login-form-link">
            No account yet?{' '}
            <Link to="/signup" className="signup-link">
                
              Sign up
            </Link>
          </p>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
