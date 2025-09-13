import React, { useState } from "react";
import "./Navbar.css";
import MoviesSearcher from "../MoviesSearcher/MoviesSearcher";

const Navbar = ({ onSearch }) => {
  return (
    <div>
      <div className="app_container">
        <MoviesSearcher onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Navbar;
