import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./App.css";

const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [movieLink, setMovieLink] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [reload, setReload] = useState(false);

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
  }, [reload]);

  // Add Movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      description,
      movieLink,
      movieImage,
      releaseDate: releaseYear,
      genre,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/movies",
        newMovie
      );
      console.log("Created movie:", response.data);
      setMovies([...movies, response.data]);
      setReload(!reload);
      setTitle("");
      setDescription("");
      setMovieLink("");
      setMovieImage("");
      setReleaseYear("");
      setGenre("");
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  // Remove Movie
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Movie Link"
          value={movieLink}
          onChange={(e) => setMovieLink(e.target.value)}
        />
        <input
          type="url"
          placeholder="Movie Image URL"
          value={movieImage}
          onChange={(e) => setMovieImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          min="1900"
          max="2099"
          step="1"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Add Movie
        </button>
      </form>
      <div className="movie-list">
        <h2>Existing Movies ({movies.length})</h2>
        {movies.map((movie) => (
          <div key={movie._id} className="movie-item">
            <h3>{movie.title}</h3>
            <button
              onClick={() => handleRemove(movie._id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMovie;
