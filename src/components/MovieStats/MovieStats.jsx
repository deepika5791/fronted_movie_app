import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieStats.css";
import DeleteAllMovies from "../DeleteAllMovies/DeleteAllMovies";
const MovieStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies/stats");
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch stats.");
        setLoading(false);
      }
    };

    fetchStats();
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
      <div className="">
        <DeleteAllMovies />
      </div>
    </>
  );
};

export default MovieStats;
