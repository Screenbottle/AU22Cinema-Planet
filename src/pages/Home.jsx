import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const API_KEY = "34a3a84e40cb412a83d35dc3d683b406";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US`;

    if (selectedCategory !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US&with_genres=${selectedCategory}`;
    }

    if (searchQuery !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=34a3a84e40cb412a83d35dc3d683b406&language=en-US&query=${searchQuery}`;
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
  }, [selectedCategory, searchQuery]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w780/";

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
    <div className="Home">
      <div className="search-bar">
        <input type="text" placeholder="Search movies" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="categories">
        {Object.keys(genres).map((id) => (
          <span
            key={id}
            className={id === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(id === selectedCategory ? "" : id)}
          >
            {genres[id]}
          </span>
        ))}
      </div>

      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={5000} 
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
      <div key={movie.id}>
        <Link to={`/movie/${movie.id}`}>
            <img
  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
  alt={movie?.title}
/>
        <div className="poster-overlay">
          <h2>{movie.title}</h2>
          <p className="movie-info-items">Release Date: <span>{movie.release_date}</span></p>
          <p className="movie-info-items">Rating: <span><Rating rating={movie.vote_average} /></span></p>
          <p className="movie-info-items">Genres: <span>{movie.genre_ids.map((id) => genres[id]).join(", ")}</span></p>
         </div>
        </Link>
        </div>
    ))}
  </Carousel>
</div>

<ul className="movies-grid">
      {popularMovies.map((movie) => (
        <li key={movie.id}>
           <Link to={`/movie/${movie.id}`}>
            <img src={imageBaseUrl + movie.backdrop_path} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p className="movie-info-item">Release Date: <span>{movie.release_date}</span></p>
              <p className="movie-info-item">Rating: <span><Rating rating={movie.vote_average} /></span></p>
              <p className="movie-info-item">Genres: <span>{movie.genre_ids.map((id) => genres[id]).join(", ")}</span></p>
              <Link to={``}>
  <a className="buy-now">
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

export default Home;
