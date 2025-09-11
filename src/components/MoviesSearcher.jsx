import React, { useState } from "react";
import "./MoviesSearcher.css";
const MoviesSearcher = ({onSearch}) => {
  return (
    <div>
      <div className="searcher_Container">
        <input
          type="text"
          placeholder="Enter Movies"
          className="all_Movies_Searcher"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MoviesSearcher;
