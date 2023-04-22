import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const API_KEY = "34a3a84e40cb412a83d35dc3d683b406";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`;

    if (selectedCategory !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US&with_genres=${selectedCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
    
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        const genresObj = {};
        data.genres.forEach((genre) => {
          genresObj[genre.id] = genre.name;
        });
        setGenres(genresObj);
      });
  }, [selectedCategory]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

  const Rating = ({ rating }) => {
    const stars = Math.round(rating / 2);
    const emptyStars = 5 - stars;

    return (
      <div className="rating">
        {[...Array(stars)].map((_, index) => (
          <span key={index} className="star filled">&#9733;</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="star">&#9734;</span>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="Home">
      <div className="category-filter">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {Object.keys(genres).map((id) => (
            <option key={id} value={id}>{genres[id]}</option>
          ))}
        </select>
      </div>
      <ul className="movies-grid">
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={imageBaseUrl + movie.backdrop_path} alt={movie.title} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p className="movie-info-">Release Date: <span>{movie.release_date}</span></p>
                <p className="movie-info-item">Rating: <span><Rating rating={movie.vote_average} /></span></p>
                <p className="movie-info-item">Genres: <span>{movie.genre_ids.map((id) => genres[id]).join(", ")}</span></p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
