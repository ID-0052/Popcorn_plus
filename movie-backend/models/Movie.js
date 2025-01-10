const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  movieLink: { type: String },
  movieImage: { type: String },
  releaseDate: { type: String },
  genre: { type: String },
});

module.exports = mongoose.model("Movie", MovieSchema);
