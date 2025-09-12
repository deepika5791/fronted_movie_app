import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./MovieList.css";
import Filter from "../../components/Filter/Filter";
import DeleteAllMovies from "../../components/DeleteAllMovies/DeleteAllMovies";

const MovieList = ({ searchQuery }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const handleMoviesDeleted = () => setFilteredData([]);
    window.addEventListener("moviesDeleted", handleMoviesDeleted);

    return () => {
      window.removeEventListener("moviesDeleted", handleMoviesDeleted);
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
              <li key={movie.id}>
                <table border="1">
                  <tbody>
                    <tr>
                      <td>
                        <NavLink
                          className="list"
                          to={`/movie/${movie.id}`}
                          style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "normal",
                            textDecoration: "none",
                          })}
                        >
                          <h3>id: {movie.id}</h3>
                          <h3>{movie.title}</h3>
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
