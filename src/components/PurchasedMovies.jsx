import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "./PurchasedMovies.css";
import { getLibrary } from "../features/firestoreLibrary";

const PurchasedMovies = () => {
  const [libraryItems, setLibraryItems] = useState([]);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const items = await getLibrary();
      const updatedItems = items.map((item) => ({
        ...item,
        release_year: item.release_date.split("-")[0],
      }));
      setLibraryItems(updatedItems);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  const formatPurchasedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="purchased-movies">
      <h2>Purchased Movies</h2>
      <div className="purchased-movie-list"> 
        {libraryItems.map((item) => (
          <div key={item.movie_id} className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="movie-poster" />
            <div className="movie-details">
              <h3 className="movie-title">{item.title}</h3>
              <p className="movie-release-year">
                Release Year: {item.release_year || "N/A"}
              </p>
              <p className="movie-purchased-date">
                Purchased Date: {formatPurchasedDate(item.purchase_date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedMovies;
