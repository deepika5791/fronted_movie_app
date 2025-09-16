import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MoviesSearcher from "../MoviesSearcher/MoviesSearcher";
import Filter from "../Filter/Filter";

const Navbar = ({ onSearch, onFilterChange }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://movieapi-1-txwt.onrender.com/movies");
        const data = await res.json();
        setMovies(data.data);
        onFilterChange(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  const handleCreateClick = () => {
    window.dispatchEvent(new Event("openNewMovieForm"));
  };

  return (
    <div>
      <div className="app_container">
        <MoviesSearcher onSearch={onSearch} />
        <button onClick={handleCreateClick} className="Create">
          Create
        </button>
      </div>
      <Filter movies={movies} onFilter={onFilterChange} />
    </div>
  );
};

export default Navbar;
