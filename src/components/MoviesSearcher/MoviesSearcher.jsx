import React, { useState } from "react";
import "./MoviesSearcher.css";
const MoviesSearcher = ({ onSearch }) => {
  return (
    <div>
      <div className="searcher_Container">
        <input
          type="text"
          className="all_Movies_Searcher"
          placeholder="Search movies by title"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MoviesSearcher;
