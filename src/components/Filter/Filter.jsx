import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ onFilter }) => {
  const [years, setYears] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [topN, setTopN] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movies");
        const movies = res.data.data;

        setYears([...new Set(movies.map((m) => m.year))]);
        setDirectors([...new Set(movies.map((m) => m.director))]);

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
  }, [selectedYear, selectedDirector, topN, sortBy, sortOrder]);

  return (
    <div className="filter-container">
      <select
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(e.target.value);
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

      <select
        value={selectedDirector}
        onChange={(e) => {
          setSelectedDirector(e.target.value);
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

      <select
        value={topN}
        onChange={(e) => {
          setTopN(e.target.value);
          setSelectedYear("");
          setSelectedDirector("");
        }}
      >
        <option value="">Top Movies</option>
        <option value="5">Top 5</option>
        <option value="10">Top 10</option>
        <option value="15">Top 15</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="year">Year</option>
        <option value="title">Title</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default Filter;
