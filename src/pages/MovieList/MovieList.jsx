import React from "react";
import { NavLink } from "react-router-dom";
import "./MovieList.css";

const MovieList = ({ searchQuery, movies }) => {
  const filteredData = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="all_movie_containerr">
      <ul className="all-dataa">
        {filteredData.length > 0 ? (
          filteredData.map((movie) => (
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
  );
};

export default MovieList;
