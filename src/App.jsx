import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AllMovies from "./components/AllMovies";
import MovieList from "./pages/MovieList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <Router>
        <div className="container">
          <div className="left">
            <MovieList searchQuery={searchQuery} />
          </div>
          <div className="right">
            <Routes>
              <Route path="/movie/:id" element={<AllMovies />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
