import { createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Signup.css';

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorElement, setErrorElement] = useState(null);

    const onSubmit = async () => {
        
        if (email != null && password != null) {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate('/login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                createErrorElement(errorCode, errorMessage);
            });

        }
    }

    const createErrorElement = (errorCode, errorMessage) => {
        setErrorElement(
            <div>
                <h5>Something went wrong: {errorCode} {errorMessage}</h5>
            </div>
        );
    }

    return (
        <div className="signup-container">
            <section className="signup-section">
                    <div className="signup-form-container">
                    <p className="signup-text">Sign up to your account!</p>
                        <form>                                                                                            
                            <div>
                                  <label htmlFor="email-address">Email address</label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  
                                    required                                    
                                    placeholder="Email address"                                
                                />
                            </div>

                            <div>
                                <label htmlFor="password"> Password</label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required                                 
                                    placeholder="Password"              
                                />
                            </div>

                            <br/>

                            {errorElement}

                            <br/>
                        <div>
                            <button
                                className="signup-form-button"
                                onClick={onSubmit}>Sign up</button>
                            </div>                                         
                        </form>
                    <p className="signup-form-link">
                            Already have an account?{' '}
                            <NavLink to="/login" className="login-link">
                                Sign in
                            </NavLink>
                        </p>                   
                    </div>
                
            </section>
        </div>
    );
}

export default Signup;
