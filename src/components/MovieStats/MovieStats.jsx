import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="movie-stats">
      <h2>Movie Statistics</h2>
      <ul>
        <li>
          <strong>Total Movies:</strong> {stats.totalMovies}
        </li>
        <li>
          <strong>Average Rating:</strong> {stats.averageRating}
        </li>
        <li>
          <strong>Longest Movie:</strong> {stats.maxDuration}
        </li>
      </ul>
    </div>
  );
};

export default MovieStats;
