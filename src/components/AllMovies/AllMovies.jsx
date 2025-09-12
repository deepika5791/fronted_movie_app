import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AllMovies.css";
import Delete from "../Delete/Delete";
import NewMovie from "../../pages/NewMovie/NewMovie";
import DeleteAllMovies from "../DeleteAllMovies/DeleteAllMovies";
import Edit from "../Edit/Edit";
import MovieStats from "../MovieStats/MovieStats";
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
                  <h4>Id: {movie.id}</h4>
                  <h3>Title: {movie.title}</h3>
                  <h4>Rating: {movie.rating}</h4>
                  <h4>Year: {movie.year}</h4>
                  <h4>Genres: {movie.genre.join(", ")}</h4>
                  <h4>Cast: {movie.cast.join(", ")}</h4>
                  <h5>Director: {movie.director}</h5>
                  <MovieStats />
                  <div className="movie-buttons">
                    <button onClick={() => setEditData(movie)} className="Edit">
                      Edit
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
          <p className="No_movieData">No movies found.</p>
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
