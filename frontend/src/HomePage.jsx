import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              to={`/movies/${movie._id}`}
              key={movie._id}
              className="movie-card-link"
            >
              <div className="movie-card">
                <img
                  src={movie.movieImage || "https://via.placeholder.com/200"}
                  alt={movie.title}
                  className="movie-card-image"
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found!</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
