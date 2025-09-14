import React, { useState } from "react";
import "./NewMovie.css";
import axios from "axios";
import { FaRegSave } from "react-icons/fa";

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
      const response = await axios.post(
        "http://localhost:5000/movies",
        payload
      );
      const newMovie = response.data.data || response.data;

      // Dispatch a global event so MovieList knows about it
      window.dispatchEvent(
        new CustomEvent("movieCreated", { detail: { movie: newMovie } })
      );

      if (onSuccess) onSuccess(newMovie);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-containers">
        <div className="column_1">
          <input
            required
            placeholder="title"
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Director"
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="year"
            type="text"
            name="year"
            value={movie.year}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Duration"
            name="duration"
            value={movie.duration}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Rating"
            type="text"
            name="rating"
            value={movie.rating}
            onChange={handleChanges}
          />
        </div>

        <div className="colmun_2">
          <input
            required
            placeholder="Genre"
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Cast"
            type="text"
            name="cast"
            value={movie.cast}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Poster"
            type="text"
            name="poster"
            value={movie.poster}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="Trailer"
            type="text"
            name="trailer"
            value={movie.trailer}
            onChange={handleChanges}
          />
          <br />
          <input
            required
            placeholder="TrailerThumbnail"
            type="text"
            name="trailerThumbnail"
            value={movie.trailerThumbnail}
            onChange={handleChanges}
          />
          <br />

          <div className="btn">
            <div className="btns">
              <button type="submit" className="submit">
                <FaRegSave /> Save Movie
              </button>
            </div>
            <div className="btn1">
              <button type="button" className="cancel" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
