import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./MovieList.css";
import Filter from "../../components/Filter/Filter";
import DeleteAllMovies from "../../components/DeleteAllMovies/DeleteAllMovies";

const MovieList = ({ searchQuery }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const handleMoviesDeleted = () => setFilteredData([]);

    const handleMovieDeleted = (e) => {
      const deletedId = e.detail.id;
      setFilteredData((prev) => prev.filter((m) => m.id !== deletedId));
    };

    const handleMovieCreated = (e) => {
      const newMovie = e.detail.movie;
      setFilteredData((prev) => [...prev, newMovie]);
    };

    window.addEventListener("moviesDeleted", handleMoviesDeleted);
    window.addEventListener("movieDeleted", handleMovieDeleted);
    window.addEventListener("movieCreated", handleMovieCreated);

    return () => {
      window.removeEventListener("moviesDeleted", handleMoviesDeleted);
      window.removeEventListener("movieDeleted", handleMovieDeleted);
      window.removeEventListener("movieCreated", handleMovieCreated);
    };
  }, []);

  const finalData = filteredData.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div>
      <Filter onFilter={(filtered) => setFilteredData(filtered)} />
      <div className="all_movie_containerr">
        <ul className="all-dataa">
          {finalData.length > 0 ? (
            finalData.map((movie) => (
              <li key={movie.id} className="single">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "list active" : "list"
                          }
                          to={`/movie/${movie.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <h3>id: {movie.id}</h3>
                          <h3 className="movie_title_list">{movie.title}</h3>
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            ))
          ) : (
            <p className="No_MovieData">No movies found.</p>
          )}
        </ul>
      </div>
      <DeleteAllMovies onDeleted={() => setFilteredData([])} />
    </div>
  );
};

export default MovieList;
