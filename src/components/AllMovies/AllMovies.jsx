import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AllMovies.css";
import Delete from "../Delete/Delete";
import NewMovie from "../../pages/NewMovie/NewMovie";
import DeleteAllMovies from "../DeleteAllMovies/DeleteAllMovies";
import Edit from "../Edit/Edit";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
const AllMovies = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [edit, setEditData] = useState(null);
  const [showNewMovie, setShowNewMovie] = useState(false);

  const fetchData = async () => {
    try {
      const url = id
        ? `http://localhost:5000/movies/${id}`
        : `http://localhost:5000/movies`;
      const response = await axios.get(url);
      const movies = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setData(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleMoviesDeleted = () => setData([]);
    window.addEventListener("moviesDeleted", handleMoviesDeleted);

    return () => {
      window.removeEventListener("moviesDeleted", handleMoviesDeleted);
    };
  }, [id]);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((movie) => movie.id !== id));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    return (
      <>
        {Array.from({ length: 5 }, (_, i) =>
          i < fullStars ? (
            <FaStar key={i} color="gold" />
          ) : (
            <FaRegStar key={i} color="gold" />
          )
        )}
      </>
    );
  };

  return (
    <div className="all_movie_container">
      <DeleteAllMovies onDeleted={() => setData([])} />
      <ul className="all-data">
        {data.length > 0 ? (
          data.map((movie) => (
            <li key={movie.id} className="movie_Data">
              {edit && edit.id === movie.id ? (
                <Edit
                  movie={movie}
                  onSuccess={() => {
                    fetchData();
                    setEditData(null);
                  }}
                />
              ) : (
                <>
                  <h4 class="movies_id">Id: {movie.id}</h4>
                  <h3 className="Movie_Title">Title: {movie.title}</h3>

                  <h4 className="Movie_Rating">
                    <div className="ratingNumbers">({movie.rating})</div>
                    <div className="rating_stars">
                      {renderStars(movie.rating)}
                    </div>
                  </h4>
                  <div className="all_Movie_Section">
                    <div className="movie-item">
                      <div className="Movie_labels">Year</div>
                      <h4 className="box">{movie.year}</h4>
                    </div>
                    <div className="movie-item">
                      <div className="Movie_labels">Genre</div>
                      <h4 className="box">{movie.genre.join(", ")}</h4>
                    </div>
                    <div className="movie-item">
                      <div className="Movie_labels">Cast</div>
                      <h4 className="box">{movie.cast.join(", ")}</h4>
                    </div>
                    <div className="movie-item">
                      <div className="Movie_labels">Director</div>
                      <h5 className="box">Director: {movie.director}</h5>
                    </div>
                  </div>

                  <div className="movie-buttons">
                    <button onClick={() => setEditData(movie)} className="Edit">
                      <MdModeEdit /> Edit
                    </button>
                    <Delete id={movie.id} onDelete={handleDelete} />
                    <button
                      onClick={() => setShowNewMovie(true)}
                      className="Create"
                    >
                      Create
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <div className="no_movie-found">
            <p className="No_movieData">No movies found.</p>
          </div>
        )}

        {showNewMovie && (
          <li>
            <NewMovie
              onSuccess={() => {
                fetchData();
                setShowNewMovie(false);
              }}
              onCancel={() => setShowNewMovie(false)}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default AllMovies;
