import React, { useEffect, useState } from "react";
import "./Filter.css";
import axios from "axios";

const Filter = ({ onFilter }) => {
  const [years, setYears] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [topN, setTopN] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [genre, setGenres] = useState([]);
  const [selectedGenre, setselectedGenre] = useState("");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movies");
        const movies = res.data.data;

        setYears([...new Set(movies.map((m) => m.year))]);
        setDirectors([...new Set(movies.map((m) => m.director))]);
        setGenres([...new Set(movies.map((m) => m.genre))]);
        onFilter(movies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        let url = "http://localhost:5000/movies";

        if (topN) {
          url = `http://localhost:5000/movies/top/${topN}`;
        } else {
          const params = [];
          if (selectedYear) params.push(`year=${selectedYear}`);
          if (selectedDirector) params.push(`director=${selectedDirector}`);
          if (selectedGenre) params.push(`genre=${selectedGenre}`);
          if (sortBy) params.push(`by=${sortBy}&order=${sortOrder}`);

          if (params.length > 0) url += `?${params.join("&")}`;
        }

        const res = await axios.get(url);
        onFilter(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiltered();
  }, [selectedYear, selectedDirector, topN, sortBy, sortOrder, selectedGenre]);

  return (
    <div className="filter-container">
      <div className="filter_group">
        <label>Year</label>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setselectedGenre("");
            setSelectedDirector("");
            setTopN("");
          }}
        >
          <option value="">Filter by Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter_group">
        <label>Director</label>
        <select
          value={selectedDirector}
          onChange={(e) => {
            setSelectedDirector(e.target.value);
            setselectedGenre("");
            setSelectedYear("");
            setTopN("");
          }}
        >
          <option value="">Filter by Director</option>
          {directors.map((dir) => (
            <option key={dir} value={dir}>
              {dir}
            </option>
          ))}
        </select>
      </div>
      <div className="filter_group">
        <label>Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => {
            setselectedGenre(e.target.value);
            setSelectedDirector("");
            setSelectedYear("");
            setTopN("");
          }}
        >
          <option value="">Filter by Genre</option>
          {genre.map((gen) => (
            <option key={gen} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>
      <div className="filter_group">
        <label>Top Movies</label>
        <select
          value={topN}
          onChange={(e) => {
            setTopN(e.target.value);
            setSelectedYear("");
            setSelectedDirector("");
            setselectedGenre("");
          }}
        >
          <option value="">Top Movies</option>
          <option value="5">Top 5</option>
          <option value="10">Top 10</option>
          <option value="15">Top 15</option>
        </select>
      </div>

      <div className="filter_group">
        <label>Sort By</label>
        <select
          className="filter-select"
          value={sortBy + "-" + sortOrder}
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
