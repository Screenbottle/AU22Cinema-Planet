import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
            // Do something with the user object
        })
        .catch(error => {
            // Handle the error
        });
    };

    const handleSignUp = () => {
        
    }

    return (
        <div>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <br/>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}

export default Login;
