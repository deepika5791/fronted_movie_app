import React, { useState } from "react";
import axios from "axios";
import "./DeleteAllMovies.css";

const DeleteAllMovies = ({ onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all movies?")) return;

    setLoading(true);
    try {
      await axios.delete("http://localhost:5000/movies");
      alert("All movies have been deleted!");

     
      window.dispatchEvent(new Event("moviesDeleted"));

      if (onDeleted) onDeleted();
    } catch (error) {
      console.error("Error deleting all movies:", error);
      alert("Failed to delete all movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <button
        className="DeleteAllMovies"
        onClick={handleDeleteAll}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete All Movies"}
      </button>
    </div>
  );
};

export default DeleteAllMovies;
