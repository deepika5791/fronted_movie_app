import React, { useState } from "react";
import "./Edit.css";
import Update from "../Update/Update";

const Edit = ({ movie, onSuccess }) => {
  const [form, setmovies] = useState({
    title: movie.title || "",
    director: movie.director || "",
    year: movie.year || "",
    duration: movie.duration || "",
    rating: movie.rating || "",
    genre: movie.genre ? movie.genre.join(", ") : "",
    cast: movie.cast ? movie.cast.join(", ") : "",
    poster: movie.poster || "",
    trailer: movie.trailer || "",
    trailerThumbnail: movie.trailerThumbnail || "",
  });

  const handleChanges = (e) => {
    setmovies({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="new-container">
        <div className="column_1">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="title"
            onChange={handleChanges}
            value={form.title}
          />

          <label>Director:</label>
          <input
            type="text"
            name="director"
            className="director"
            onChange={handleChanges}
            value={form.director}
          />

          <label>Year:</label>
          <input
            type="text"
            name="year"
            className="year"
            onChange={handleChanges}
            value={form.year}
          />

          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            className="duration"
            onChange={handleChanges}
            value={form.duration}
          />

          <label>Rating:</label>
          <input
            type="text"
            name="rating"
            className="rating"
            onChange={handleChanges}
            value={form.rating}
          />
        </div>

        <div className="colmun_2">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            className="genre"
            onChange={handleChanges}
            value={form.genre}
          />

          <label>Cast:</label>
          <input
            type="text"
            name="cast"
            className="cast"
            onChange={handleChanges}
            value={form.cast}
          />

          <label>Poster:</label>
          <input
            type="text"
            name="poster"
            className="poster"
            onChange={handleChanges}
            value={form.poster}
          />

          <label>Trailer:</label>
          <input
            type="text"
            name="trailer"
            className="trailer"
            onChange={handleChanges}
            value={form.trailer}
          />

          <label>Trailer Thumbnail:</label>
          <input
            type="text"
            name="trailerThumbnail"
            className="trailerThumbnail"
            onChange={handleChanges}
            value={form.trailerThumbnail}
          />

          <Update movie={movie} form={form} onSuccess={onSuccess} />
        </div>
      </div>
    </form>
  );
};

export default Edit;
