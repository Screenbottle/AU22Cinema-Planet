import React, { useState, useEffect } from 'react';
import './MovieSearch.css';

function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState("movie");
  const APIKey = '39f77c46334b019ecb1cdf2bc7c1829a';


  useEffect(() => {
    const apiUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=39f77c46334b019ecb1cdf2bc7c1829a';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error(error));
  }, []);


  function handleGenreSelect(genreId) {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    setMovies([]);
    fetchMovies();
  }


  function fetchMovies() {
    let apiUrl = '';
  
    if (searchType === "movie") {
      apiUrl = 'https://api.themoviedb.org/3/search/movie?';
  
      if (searchQuery) {
        apiUrl += `query=${searchQuery}&`;
      } else if (selectedGenres.length > 0) {
        const genreIds = selectedGenres.join(',');
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=${genreIds}&`;
      }
    } else if (searchType === "tv") {
      apiUrl = 'https://api.themoviedb.org/3/search/tv?';
  
      if (searchQuery) {
        apiUrl += `query=${searchQuery}&`;
      } else if (selectedGenres.length > 0) {
        const genreIds = selectedGenres.join(',');
        apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${APIKey}&with_genres=${genreIds}&`;
      }
    } else if (searchType === "person") {
      apiUrl = 'https://api.themoviedb.org/3/search/person?';
      
      if (searchQuery) {
        apiUrl += `query=${searchQuery}&`;
      }
    }
  
    apiUrl += `api_key=${APIKey}&page=${currentPage}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error(error));
  }
  


  function handleLoadMoreClick() {
    setCurrentPage(currentPage + 1);
    fetchMovies();
  }

  return (
    <div className="movie-search-container">
      <h1>Search by Genre</h1>
      <form onSubmit={handleSearchSubmit}>
        <div className="movie-search-input">
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="movie-search-bar"
          />
          <select name="dropdown" value={searchType} onChange={(e) => setSearchType(e.target.value)} className="movie-dropdown">
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>

          <button
            className='movie-search-button'
            type="submit"
            style={{ fontSize: '20px', padding: '12px', backgroundColor: '#4CAF50', borderRadius: '5px' }}>
            Search
          </button>
        </div>

        {genres.map(genre => (
          <label key={genre.id} className="genre-checkbox">
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreSelect(genre.id)}
            />
            {genre.name}
          </label>
        ))}

      </form>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-overview">
                {movie.overview.length > 140 ?
                  `${movie.overview.substring(0, 140)}...` : movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
      {currentPage < totalPages && (
        <button onClick={handleLoadMoreClick}>Load More</button>
      )}
    </div>
  );
}

export default MovieSearch;
