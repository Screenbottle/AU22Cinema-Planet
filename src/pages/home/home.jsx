import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const API_KEY = "34a3a84e40cb412a83d35dc3d683b406";
    
    // Fetch popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
    
    // Fetch movie genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        const genresObj = {};
        data.genres.forEach((genre) => {
          genresObj[genre.id] = genre.name;
        });
        setGenres(genresObj);
      });
  }, []);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";
  const size = "15px";

  const getRatingImage = (voteAverage) => {
    if (voteAverage >= 8) {
      return <img src="http://clipart-library.com/img/2184497.png" alt="good" style={{ width: size, height: size }} />;
    } else if (voteAverage >= 6) {
      return <img src="http://clipart-library.com/img/2184497.png" alt="ok" style={{ width: size, height: size }} />;
    } else {
      return <img src="http://clipart-library.com/img/2184497.png" alt="bad" style={{ width: size, height: size }} />;
    }
  };

  return (
    <div className="">
      <ul className="movies-grid">
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={imageBaseUrl + movie.backdrop_path} alt={movie.title} />
              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p className="movie-info-item">Release Date: <span>{movie.release_date}</span></p>
                <p className="movie-info-item">Rating: {getRatingImage(movie.vote_average)} <span className="rating">{movie.vote_average}</span></p>
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
