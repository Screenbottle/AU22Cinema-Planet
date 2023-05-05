import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import Home from './pages/Home'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieSearch from './MovieSearch';
import MovieDetails from './components/MovieDetails';
import MovieNotFound from './components/MovieNotFound';

import './App.css'






function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA63z_hiERVvdwqjaFzotvDSv4i2khRX4c",
    authDomain: "au22cinema-planet.firebaseapp.com",
    projectId: "au22cinema-planet",
    storageBucket: "au22cinema-planet.appspot.com",
    messagingSenderId: "271914838545",
    appId: "1:271914838545:web:4851c4d8fc1a38eaa5dfb0"
  };


  const [app, setApp] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    //setApp(initializeApp(firebaseConfig));
    //setAuth(getAuth(app));
  }, []);

  return (
    <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path='/movie/:movie_id' element= {
            <MovieDetails />
          } ></Route>
        </Routes>
    </div>
  );
}

export default App;
