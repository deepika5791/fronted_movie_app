import React, { useState } from "react";
import axios from "axios";
import "./Update.css";
const Update = ({ movie, form, onSuccess }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fieldSets = { ...form };
    if (fieldSets.genre)
      fieldSets.genre = fieldSets.genre.split(",").map((g) => g.trim());
    if (fieldSets.cast)
      fieldSets.cast = fieldSets.cast.split(",").map((c) => c.trim());

    try {
      const res = await axios.put(
        `http://localhost:5000/movies/${movie.id}`,
        fieldSets
      );
      setSuccess("Movie updated successfully!");
      onSuccess(res.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="btn">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button type="submit" onClick={handleUpdate} className="Update_Movie">
        Update
      </button>
    </div>
  );
};

export default Update;
