import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AllMovies.css";
import Delete from "../Delete/Delete";
import Edit from "../Edit/Edit";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import loader from "../../assets/loader.gif";

const AllMovies = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [edit, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = id
        ? `https://movieapi-1-txwt.onrender.com/movies/${id}`
        : `https://movieapi-1-txwt.onrender.com/movies`;
      const response = await axios.get(url);
      const movies = Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
      setData(movies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((movie) => movie._id !== id));
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

  if (loading) {
    return (
      <div className="loader-container">
        <img src={loader} className="loader" />
      </div>
    );
  }

  return (
    <div className="all_movie_container">
      <ul className="all-data">
        {data.length > 0 ? (
          data.map((movie) => (
            <li key={movie._id} className="movie_Data">
              {edit && edit._id === movie._id ? (
                <Edit
                  movie={movie}
                  onSuccess={(updatedMovie) => {
                    setData((prev) =>
                      prev.map((m) =>
                        m._id === updatedMovie._id ? updatedMovie : m
                      )
                    );
                    setEditData(null);
                  }}
                />
              ) : (
                <>
                  <h4 className="movies_id">Id: {movie._id}</h4>
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
                      <h5 className="box">{movie.director}</h5>
                    </div>
                    <div className="movie-item">
                      <div className="Movie_labels">Duration</div>
                      <h5 className="box">{movie.duration}</h5>
                    </div>
                  </div>

                  <div className="movie-buttons">
                    <button onClick={() => setEditData(movie)} className="Edit">
                      <MdModeEdit /> Edit
                    </button>
                    <Delete id={movie._id} onDelete={handleDelete} />
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
      </ul>
    </div>
  );
};

export default AllMovies;
