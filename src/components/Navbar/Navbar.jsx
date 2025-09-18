import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MoviesSearcher from "../MoviesSearcher/MoviesSearcher";
import Filter from "../Filter/Filter";

const Navbar = ({ onSearch, onFilterChange, onCreate }) => {
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
  }, [onFilterChange]);

  return (
    <div>
      <div className="app_container">
        <MoviesSearcher onSearch={onSearch} />
        <button onClick={onCreate} className="Create">
          Create
        </button>
      </div>
      <Filter movies={movies} onFilter={onFilterChange} />
    </div>
  );
};

export default Navbar;
