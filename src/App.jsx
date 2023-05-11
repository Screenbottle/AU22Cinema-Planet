import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieSearch from './MovieSearch';
import MovieDetails from './components/MovieDetails';
import MovieNotFound from './components/MovieNotFound';
import Signup from './components/Signup';
import { auth } from './firebase';

import './App.css'
import Login from './components/Login'


function App() {

  return (
    <div className="App">
        <Header />
        <Routes>
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
        </Routes>
    </div>
  );
}

export default App;
