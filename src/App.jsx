import { useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'

import MovieDetails from './components/MovieDetails';
import MovieNotFound from './components/MovieNotFound';
import { Route, Router, Routes } from 'react-router-dom';

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

  //const [app, setApp] = useState(null)

  //useEffect(() => {
    //setApp(initializeApp(firebaseConfig));
  //}, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <MovieNotFound />
        }/>

        <Route path='/movie/:movie_id' element={
          <MovieDetails />
        }/>
      </Routes>
      
    </div>
  )
}

export default App
