import React from "react";
import "./Navbar.css";
import MoviesSearcher from "../MoviesSearcher/MoviesSearcher";

const Navbar = ({ onSearch }) => {
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
    </div>
  );
};

export default Navbar;
