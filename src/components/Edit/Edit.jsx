import React, { useState } from "react";
import "./Edit.css";
import Update from "../Update/Update";

const Edit = ({ movie, onSuccess }) => {
  const initialForm = {
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
  };

  const [form, setMovies] = useState(initialForm);

  const handleChanges = (e) => {
    setMovies({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setMovies(initialForm);
  };

  return (
    <form>
      <div className="new-container">
        <h2 className="form-title">Edit Movie</h2>

        <div className="column_1">
          <div className="form-group">
            <label>Title:</label>
            <input
              placeholder="Title"
              type="text"
              name="title"
              onChange={handleChanges}
              value={form.title}
            />
          </div>

          <div className="form-group">
            <label>Director:</label>
            <input
              placeholder="Director"
              type="text"
              name="director"
              onChange={handleChanges}
              value={form.director}
            />
          </div>

          <div className="form-group">
            <label>Year:</label>
            <input
              placeholder="Year"
              type="text"
              name="year"
              onChange={handleChanges}
              value={form.year}
            />
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <input
              placeholder="Duration"
              type="text"
              name="duration"
              onChange={handleChanges}
              value={form.duration}
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <input
              placeholder="Rating"
              type="text"
              name="rating"
              onChange={handleChanges}
              value={form.rating}
            />
          </div>
        </div>

        <div className="colmun_2">
          <div className="form-group">
            <label>Genre:</label>
            <input
              placeholder="Genre"
              type="text"
              name="genre"
              onChange={handleChanges}
              value={form.genre}
            />
          </div>

          <div className="form-group">
            <label>Cast:</label>
            <input
              placeholder="Cast"
              type="text"
              name="cast"
              onChange={handleChanges}
              value={form.cast}
            />
          </div>

          <div className="form-group">
            <label>Poster:</label>
            <input
              placeholder="Poster"
              type="text"
              name="poster"
              onChange={handleChanges}
              value={form.poster}
            />
          </div>

          <div className="form-group">
            <label>Trailer:</label>
            <input
              placeholder="Trailer"
              type="text"
              name="trailer"
              onChange={handleChanges}
              value={form.trailer}
            />
          </div>

          <div className="form-group">
            <label>Trailer Thumbnail:</label>
            <input
              placeholder="Trailer Thumbnail"
              type="text"
              name="trailerThumbnail"
              onChange={handleChanges}
              value={form.trailerThumbnail}
            />
          </div>

          <div className="btn-group">
            <Update movie={movie} form={form} onSuccess={onSuccess} />
            <button
              type="button"
              onClick={handleCancel}
              className="Cancel_Movie"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Edit;
