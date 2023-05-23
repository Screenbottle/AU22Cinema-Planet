import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieSearch from './MovieSearch';
import MovieDetails from './components/MovieDetails';
import MovieNotFound from './components/MovieNotFound';
import ShoppingCart from './components/ShoppingCart'
import Signup from './components/Signup';
import { auth } from './firebase';
import Checkout from './components/Checkout'
import './App.css'
import Login from './components/Login'
import PurchasedMovies from './components/PurchasedMovies';


function App() {

  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path='/checkout' element={<Checkout/>}> </Route>
          <Route path='/shoppingcart' element={<ShoppingCart/>}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path='/movie/:movie_id' element= {
            <MovieDetails />
          } ></Route>
          <Route path='/signup' element={
            <Signup />
          }></Route>
          <Route path='/login' element={
            <Login/>
          }>
          </Route>
          <Route path='/purchased-movies' element={<PurchasedMovies />} ></Route>
        </Routes>
    </div>
  );
}

export default App;