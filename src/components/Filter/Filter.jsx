import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Filter.css";

const Filter = ({ onFilter }) => {
  const [years, setYears] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [topN, setTopN] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchMovies = async () => {
    try {
      const params = {};

      if (selectedYear) params.year = selectedYear;
      if (selectedDirector) params.director = selectedDirector;
      if (selectedGenre) params.genre = selectedGenre;
      if (sortBy) {
        params.by = sortBy;
        params.order = sortOrder;
      }

      const res = await axios.get(
        "https://movieapi-1-txwt.onrender.com/movies",
        {
          params,
        }
      );

      let movies = res.data.data || [];

      // ✅ Frontend only handles Top N
      if (topN) {
        movies = [...movies]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, Number(topN));
      }

      onFilter(movies);

      // Build dropdown options dynamically
      if (!years.length || !directors.length || !genres.length) {
        const allYears = [...new Set(movies.map((m) => m.year))].sort(
          (a, b) => b - a
        );
        setYears(allYears);

        const allDirectors = movies
          .flatMap((m) => m.director || [])
          .map((d) => (typeof d === "string" ? d.trim() : ""))
          .filter(Boolean);
        setDirectors([...new Set(allDirectors)].sort());

        const allGenres = movies
          .flatMap((m) => m.genre || [])
          .map((g) => (typeof g === "string" ? g.trim() : ""))
          .filter(Boolean);
        setGenres([...new Set(allGenres)].sort());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedDirector, selectedGenre, topN, sortBy, sortOrder]);

  return (
    <div className="filter-container">
      {/* Year Filter */}
      <div className="filter_group">
        <label>Year</label>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedDirector("");
            setSelectedGenre("");
            setTopN("");
          }}
        >
          <option value="">Filter by Year</option>
          {years.map((year) => (
            <option key={`year-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Director Filter */}
      <div className="filter_group">
        <label>Director</label>
        <select
          value={selectedDirector}
          onChange={(e) => {
            setSelectedDirector(e.target.value);
            setSelectedYear("");
            setSelectedGenre("");
            setTopN("");
          }}
        >
          <option value="">Filter by Director</option>
          {directors.map((dir) => (
            <option key={`dir-${dir}`} value={dir}>
              {dir}
            </option>
          ))}
        </select>
      </div>

      {/* Genre Filter */}
      <div className="filter_group">
        <label>Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setSelectedYear("");
            setSelectedDirector("");
            setTopN("");
          }}
        >
          <option value="">Filter by Genre</option>
          {genres.map((gen) => (
            <option key={`genre-${gen}`} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>

      {/* Top Movies */}
      <div className="filter_group">
        <label>Top Movies</label>
        <select
          value={topN}
          onChange={(e) => {
            setTopN(e.target.value);
            setSelectedYear("");
            setSelectedDirector("");
            setSelectedGenre("");
          }}
        >
          <option value="">Top Movies</option>
          <option value="5">Top 5</option>
          <option value="10">Top 10</option>
          <option value="15">Top 15</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="filter_group">
        <label>Sort By</label>
        <select
          value={sortBy ? `${sortBy}-${sortOrder}` : ""}
          onChange={(e) => {
            const [by, order] = e.target.value.split("-");
            setSortBy(by);
            setSortOrder(order);
          }}
        >
          <option value="">Sort By</option>
          <option value="rating-desc">Rating (High to Low)</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="year-desc">Year (Newest)</option>
          <option value="year-asc">Year (Oldest)</option>
          <option value="title-asc">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
