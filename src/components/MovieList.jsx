import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getGenres();
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  };

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  const getGenresById = (ids) => {
    return ids
      .map((id) => genres.find((genre) => genre.id === id))
      .map((genre) => genre.name)
      .join(", ");
  };

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
        <span className="rating-value">{rating/2}</span>
      </div>
    );
  };

  return (
    
    <div className="movie-list">
      <h2>{(type ? type : "POPULAR").toUpperCase()}</h2>
      <ul className="movies-grid">
        {movieList.map((movie) => (
          <li key={movie.id} >
            <Link to={`/movie/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
          <h2 className="movie-info-item"><span>{movie.title}</span></h2>
          <p className="movie-info-item">Release Date:<span>{movie.release_date}</span></p>
          <p className="movie-info-item">Rating: <span> <Rating rating={movie.vote_average} /></span></p>
          <p className="movie-info-item">Genres: <span>{getGenresById(movie.genre_ids)}</span></p>
          <Link to={``}>
              <a class="buy-now">
              <span><h2><img src="https://pngimg.com/uploads/plus/plus_PNG26.png"/> Buy Now</h2></span>
              </a>
              </Link>
              <h2>$12.99</h2> 
          </div>
          </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;