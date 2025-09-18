import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./pages/MovieList/MovieList";
import Header from "./components/Header/Header";
import MovieStats from "./components/MovieStats/MovieStats";
import AllMovies from "./components/AllMovies/AllMovies";
import NewMovie from "./pages/NewMovie/NewMovie";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showNewMovie, setShowNewMovie] = useState(false);

  return (
    <div>
      <Header />
      <Router>
        <Navbar
          onSearch={setSearchQuery}
          onFilterChange={setFilteredMovies}
          onCreate={() => setShowNewMovie(true)}
        />

        <div className="container">
          <div className="left">
            <MovieList searchQuery={searchQuery} movies={filteredMovies} />
          </div>
          <div className="right">
            <Routes>
              <Route
                path="/"
                element={<div className="placeholder">Select a movie</div>}
              />
              <Route path="/movie/:id" element={<AllMovies />} />
            </Routes>
          </div>
        </div>

        <MovieStats />

        {showNewMovie && (
          <NewMovie
            onSuccess={() => setShowNewMovie(false)}
            onCancel={() => setShowNewMovie(false)}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
