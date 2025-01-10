import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.css";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log(`Fetching movie with ID: ${id}`);
        const response = await axios.get(
          `http://localhost:5000/api/movies/${id}`
        );
        console.log("Movie data:", response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="single-movie-container">
        <img
          src={movie.movieImage || "https://via.placeholder.com/400"}
          alt={movie.title}
          className="movie-image"
        />
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Year:</strong> {movie.releaseDate} <br />
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Plot Summary:</strong> <br />
            {movie.description}
          </p>

          {movie.movieLink && (
            <a
              href={movie.movieLink}
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <strong>Download Movie</strong>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
