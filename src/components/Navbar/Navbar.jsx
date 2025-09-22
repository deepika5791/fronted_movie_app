import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MoviesSearcher from "../MoviesSearcher/MoviesSearcher";
import Filter from "../Filter/Filter";

const Navbar = ({ onSearch, onFilterChange, onCreate }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies once
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://movieapi-1-txwt.onrender.com/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.data);
        setFilteredMovies(data.data);
        onFilterChange(data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
        setMovies([]);
        setFilteredMovies([]);
        onFilterChange([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [onFilterChange]);

  useEffect(() => {
    onFilterChange(filteredMovies);
  }, [filteredMovies, onFilterChange]);

  return (
    <div>
      <div className="app_container">
        <MoviesSearcher
          onSearch={(query) => {
            onSearch(query);

            setFilteredMovies(
              movies.filter((m) =>
                m.title.toLowerCase().includes(query.toLowerCase())
              )
            );
          }}
        />
        <button onClick={onCreate} className="Create">
          Create
        </button>
      </div>

      {/* {loading && <p>Loading movies...</p>} */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Filter movies={movies} onFilter={setFilteredMovies} />
      )}
    </div>
  );
};

export default Navbar;
