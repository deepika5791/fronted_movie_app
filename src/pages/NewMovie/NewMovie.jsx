import React, { useState } from "react";
import "./NewMovie.css";
import axios from "axios";

const NewMovie = ({ onSuccess, onCancel }) => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    duration: "",
    rating: "",
    genre: "",
    cast: "",
    poster: "",
    trailer: "",
    trailerThumbnail: "",
  });

  const handleChanges = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movie.title.trim()) {
      alert("Title is required");
      return;
    }

    const payload = {
      ...movie,
      genre: movie.genre ? movie.genre.split(",").map((g) => g.trim()) : [],
      cast: movie.cast ? movie.cast.split(",").map((c) => c.trim()) : [],
    };

    try {
      await axios.post("http://localhost:5000/movies", payload);

      setMovie({
        title: "",
        director: "",
        year: "",
        duration: "",
        rating: "",
        genre: "",
        cast: "",
        poster: "",
        trailer: "",
        trailerThumbnail: "",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-containers">
        <div className="column_1">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChanges}
          />
          <br />
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChanges}
          />
          <br />
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={movie.year}
            onChange={handleChanges}
          />
          <br />
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={movie.duration}
            onChange={handleChanges}
          />
          <br />
          <label>Rating:</label>
          <input
            type="text"
            name="rating"
            value={movie.rating}
            onChange={handleChanges}
          />
        </div>

        <div className="colmun_2">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChanges}
            placeholder="Separate with commas"
          />
          <br />
          <label>Cast:</label>
          <input
            type="text"
            name="cast"
            value={movie.cast}
            onChange={handleChanges}
            placeholder="Separate with commas"
          />
          <br />
          <label>Poster URL:</label>
          <input
            type="text"
            name="poster"
            value={movie.poster}
            onChange={handleChanges}
          />
          <br />
          <label>Trailer URL:</label>
          <input
            type="text"
            name="trailer"
            value={movie.trailer}
            onChange={handleChanges}
          />
          <br />
          <label>Trailer Thumbnail:</label>
          <input
            type="text"
            name="trailerThumbnail"
            value={movie.trailerThumbnail}
            onChange={handleChanges}
          />
          <br />

          <div className="btn">
            <button type="submit" className="submit">
              Create
            </button>

            <button
              type="button"
              className="cancel"
              onClick={() => {
                if (onCancel) onCancel();
              }}
              style={{ marginLeft: "10px", fontSize: "20px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
