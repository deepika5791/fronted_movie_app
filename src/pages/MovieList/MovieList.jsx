import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import loader from "../../assets/loader.gif";
import "./MovieList.css";

const MovieList = ({ searchQuery, movies, onLoadingChange }) => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    setLoading(true);
    onLoadingChange(true);

    const timer = setTimeout(() => {
      const data = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
      );
      setfilteredData(data);
      setLoading(false);
      onLoadingChange(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, movies, onLoadingChange]);

  return (
    <div className="all_movie_containerr">
      {loading ? (
        <div className="loader-container">
          <img src={loader} alt="loading..." className="loader" />
        </div>
      ) : (
        <ul className="all-dataa">
          {filteredData.length > 0 ? (
            filteredData.map((movie) => (
              <li key={movie._id} className="single">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "list active" : "list"
                          }
                          to={`/movie/${movie._id}`}
                          style={{ textDecoration: "none" }}
                        >
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
      )}
    </div>
  );
};

export default MovieList;
