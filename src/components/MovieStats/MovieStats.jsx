import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieStats.css";
import DeleteAllMovies from "../DeleteAllMovies/DeleteAllMovies";

const MovieStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://movieapi-1-txwt.onrender.com/movies/stats"
      );
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleMoviesDeleted = () => {
      setStats({ totalMovies: 0, averageRating: 0, maxDuration: 0 });
    };

    window.addEventListener("moviesDeleted", handleMoviesDeleted);
    return () =>
      window.removeEventListener("moviesDeleted", handleMoviesDeleted);
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>{error}</p>;
  if (!stats) return null;

  return (
    <>
      <div className="movie-stats">
        <h2>Movie Statistics</h2>
        <ul className="stats-grid">
          <li className="stats-cards">
            <div className="stats-value">{stats.totalMovies}</div>
            <div className="stats-label">
              <strong>Total Movies:</strong>
            </div>
          </li>
          <li className="stats-cards">
            <div className="stats-value">{stats.averageRating}</div>
            <div className="stats-label">
              <strong>Average Rating:</strong>
            </div>
          </li>
          <li className="stats-cards">
            <div className="stats-value">{stats.maxDuration}</div>
            <div className="stats-label">
              <strong>Longest Movie:</strong>
            </div>
          </li>
        </ul>
      </div>
      <div className="delete-all-wrapper">
        <DeleteAllMovies />
      </div>
    </>
  );
};

export default MovieStats;
