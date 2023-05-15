import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { auth } from '../firebase';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const [sortOption, setSortOption] = useState("popularity.desc");


  useEffect(() => {
    const API_KEY = "34a3a84e40cb412a83d35dc3d683b406";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

    if (selectedCategory !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${selectedCategory}`;
    }

    if (searchQuery !== "") {
      url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        const genresObj = {};
        data.genres.forEach((genre) => {
          genresObj[genre.id] = genre.name;
        });
        setGenres(genresObj);
      });
  }, [selectedCategory, searchQuery, searchType]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w780/";

  const Rating = ({ rating }) => {
    const stars = Math.round(rating / 2);
    const emptyStars = 5 - stars;

    return (
      <div className="rating">
        {[...Array(stars)].map((_, index) => (
          <span key={index} className="star filled"> &#9733;</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="star"></span>
        ))}
        <span className="rating-value">{rating / 2}</span>
      </div>
    );
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  
    if (searchType === "movie") {
      fetchMovies(category);
    } else if (searchType === "tv") {
      fetchTVSeries(category);
    }
  };  
  

  const renderSearchResults = () => {
    if (popularMovies.length === 0) {
      return <p>No results found.</p>;
      const sortResults = (results) => {
        if (sortOption === "popularity.desc") {
          // Sort by popularity in descending order
          return results.sort((a, b) => b.popularity - a.popularity);
        } else if (sortOption === "vote_average.desc") {
          // Sort by vote average in descending order
          return results.sort((a, b) => b.vote_average - a.vote_average);
        } else {
          // Default: don't apply any sorting
          return results;
        }
      };
    
      const sortedMovies = sortResults(popularMovies);
    
      if (sortedMovies.length === 0) {
        return <p>No results found.</p>;
      }
    }

return (
  <ul className="movies-grid">
    {popularMovies.map((movie) => {
      const {
        id,
        title: mediaTitle,
        release_date,
        vote_average,
        genre_ids,
        backdrop_path,
      } = movie;

      return (
        <li key={id}>
          <Link to={`/movie/${id}`}>
            <img src={imageBaseUrl + backdrop_path} alt={mediaTitle} />
            <div className="movie-info">
                                <h2>{mediaTitle}</h2>
                  <p className="movie-info-item">Release Date: <span>{release_date}</span></p>
                  <p className="movie-info-item">Rating: <span><Rating rating={vote_average} /></span></p>
                  <p className="movie-info-item">Genres: <span>{genre_ids.map((id) => genres[id]).join(", ")}</span></p>
                  <Link to={``}>
                    <a className="buy-now">
                      <span><h2><img src="https://pngimg.com/uploads/plus/plus_PNG26.png" alt="Plus Icon" /> Buy Now</h2></span>
                    </a>
                  </Link>
                  <h2>$12.99</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  
  return (
    <div className="Home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movie/Series"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-type-buttons">
          <span
            className={`search-type-button ${searchType === 'movie' ? 'active' : ''}`}
            onClick={() => handleSearchTypeChange('movie')}
          >
            Movies
          </span>
          <span
            className={`search-type-button ${searchType === 'tv' ? 'active' : ''}`}
            onClick={() => handleSearchTypeChange('tv')}
          >
            TV Series
          </span>
        </div>
      </div>
   
  
  
      <div className="categories">
        {Object.keys(genres).map((id) => (
          <span
            key={id}
            className={id === selectedCategory ? "active" : ""}
            onClick={() => handleCategoryChange(id === selectedCategory ? "" : id)}
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
          {popularMovies.map((movie) => {
            const {
              id,
              title: mediaTitle,
              release_date,
              vote_average,
              genre_ids,
              backdrop_path,
            } = movie;
            return (
              <div key={id}>
                <Link to={`/movie/${id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                    alt={mediaTitle}
                  />
                  <div className="poster-overlay">
                    <h2>{mediaTitle}</h2>
                    <p className="movie-info-items">Release Date: <span>{release_date}</span></p>
                    <p className="movie-info-items">Rating: <span><Rating rating={vote_average} /></span></p>
                    <p className="movie-info-items">Genres: <span>{genre_ids.map((id) => genres[id]).join(", ")}</span></p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Carousel>
      </div>
      {renderSearchResults()}
    </div>
  );
};

export default Home;

