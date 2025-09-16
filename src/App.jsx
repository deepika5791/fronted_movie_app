import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./pages/MovieList/MovieList";
import Header from "./components/Header/Header";
import MovieStats from "./components/MovieStats/MovieStats";
import AllMovies from "./components/AllMovies/AllMovies";
import "./App.css";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  return (
    <div>
      <Header />
      <Navbar
        onSearch={setSearchQuery}
        onFilterChange={(movies) => setFilteredMovies(movies)}
      />
      <Router>
        <div className="container">
          <div className="left">
            <MovieList searchQuery={searchQuery} movies={filteredMovies} />
          </div>
          <div className="right">
            <Routes>
              <Route path="/movie/:id" element={<AllMovies />} />
            </Routes>
          </div>
        </div>
      </Router>
      <MovieStats />
    </div>
  );
};

export default App;
