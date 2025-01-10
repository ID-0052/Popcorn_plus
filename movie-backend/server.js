const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Movie = require("./models/Movie");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ID-0052:Farazavenueb3@id-0052.xu00n.mongodb.net/movies?retryWrites=true&w=majority&appName=ID-0052"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

// Add Movies
app.post("/api/movies", async (req, res) => {
  try {
    const { title, description, movieLink, movieImage, releaseDate, genre } =
      req.body;
    const movie = new Movie({
      title,
      description,
      movieLink,
      movieImage,
      releaseDate,
      genre,
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error creating movie" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies" });
  }
});

// Get Movie
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log(`Fetching movie with ID: ${movieId}`);
    const movie = await Movie.findById(movieId);
    if (!movie) {
      console.log(`Movie with ID ${movieId} not found`);
      return res.status(404).json({ error: "Movie not found" });
    }
    console.log(`Movie found: ${movie}`);
    res.json(movie);
  } catch (error) {
    console.error(`Error fetching movie with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Error fetching movie" });
  }
});

// Delete Movie
app.delete("/api/movies/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting movie" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
